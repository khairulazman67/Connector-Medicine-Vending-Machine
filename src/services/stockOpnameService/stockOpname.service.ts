import {
  StockOpname,
  StockOpnameStatus,
  TransactionHistoryType,
} from "@prisma/client";
import { NextFunction } from "express";
import { inject, injectable } from "tsyringe";
import { prisma } from "../../db";
import { stockOpnameTransactionHistoryDto } from "../../dtos/stockOpname.dto";
import { IEtalaseRepository } from "../../repositories/etalaseRepository/iEtalase.repository";
import { ILockingRepository } from "../../repositories/lockingRepository/iLocking.repository";
import { IStockOpnameRepository } from "../../repositories/stockOpnameRepository/iStockOpname.repository";
import { ITransactionHistoryRepository } from "../../repositories/transactionHistoryRepository/iTransactionHistory.repository";
import { StockOpnameWhereAnd } from "../../types/stockOpname.type";
import { CustomError } from "../../utils/errors/custom.error";
import {
  NotFoundError,
  UnprocessableError,
} from "../../utils/errors/dynamicCustom.error";
import {
  createStockOpnamePayload,
  processStockOpnamePayload,
} from "../../utils/validations/stockOpname.request";
import { IStockOpnameService } from "./iStockOpname.service";

@injectable()
export class StockOpnameService implements IStockOpnameService {
  constructor(
    @inject("IStockOpnameRepository")
    private stockOpnameRepository: IStockOpnameRepository,

    @inject("IEtalaseRepository")
    private etalaseRepository: IEtalaseRepository,

    @inject("ITransactionHistoryRepository")
    private transactionHistory: ITransactionHistoryRepository,

    @inject("ILockingRepository")
    private lockingRepository: ILockingRepository
  ) {}

  async createSO(
    data: createStockOpnamePayload
  ): Promise<StockOpname | undefined> {
    try {
      const result = await prisma.$transaction(async (tx) => {
        const saveData = {
          ...data,
          soCode: await this.stockOpnameRepository.generateSoCode(
            data.vmId,
            tx
          ),
          status: StockOpnameStatus.OPEN,
        };
        return await this.stockOpnameRepository.createSO(saveData, tx);
      });
      return result;
    } catch (error) {
      if (error instanceof CustomError) {
        throw new NotFoundError(error.message);
      }
      throw new Error(`There is an error ${error}`);
    }
  }

  async processScheduleStatusOpname(): Promise<StockOpname[]> {
    try {
      const now = new Date();

      const result = await prisma.$transaction(async (tx) => {
        const schedule = await this.stockOpnameRepository.getStockOpnames(
          {
            soDateTime: {
              lt: now,
            },
            status: StockOpnameStatus.OPEN,
          } as StockOpnameWhereAnd,
          tx
        );

        if (schedule && schedule.length > 0) {
          for (const item of schedule) {
            await this.stockOpnameRepository.updateSo(
              { status: StockOpnameStatus.PROCESS },
              {
                soId: item.id,
              },
              tx
            );

            await this.lockingRepository.createLocking(
              {
                vmId: item.vmId,
                message: `Transaksi ditutup sementara dikarenakan stock Opname dengan kode ${item.soCode} sedang diproses`,
              },
              tx
            );
          }
        }
        return schedule;
      });
      return result;
    } catch (error) {
      if (error instanceof CustomError) {
        throw new NotFoundError(error.message);
      }
      throw new Error(`There is an error ${error}`);
    }
  }

  async processSO(
    data: processStockOpnamePayload,
    soCode: string,
    next?: NextFunction
  ): Promise<any | unknown> {
    try {
      const soData = await this.stockOpnameRepository.getStockOpname({
        soCode: soCode,
        status: StockOpnameStatus.PROCESS,
      });
      if (!soData)
        throw new NotFoundError(`Stock Opname dengan kode ${soCode}`);

      await prisma.$transaction(async (tx) => {
        const etalaseData = await this.etalaseRepository.getByVM(data.vmId);
        if (!etalaseData) {
          throw new NotFoundError(`Etalase vending machine ${data.vmId}`);
        }
        await this.stockOpnameRepository.updateSo(
          {
            status: StockOpnameStatus.COMPLETED,
          },
          {
            soCode: soCode,
          },
          tx
        );

        if (data.details.length !== etalaseData.length)
          throw new UnprocessableError(
            `Jumlah stock detail tidak sesuai dengan jumlah vending machine ${data.vmId}`
          );

        for (const element of data.details) {
          await this.stockOpnameRepository.createSoDetail(
            {
              ...element,
              soId: soData.id ?? 0,
            },
            tx
          );

          const findData = etalaseData.find(
            (val) => val.id == element.etalaseId
          );

          if (!findData) {
            throw new NotFoundError(
              `Etalase id ${element.etalaseId} vending machine ${data.vmId}`
            );
          }
          const mappingDataSave = await stockOpnameTransactionHistoryDto(
            data,
            findData,
            {
              type:
                findData.stock > element.realStock
                  ? TransactionHistoryType.CREDIT
                  : TransactionHistoryType.DEBIT,
              lastStock: element.realStock,
            }
          );
          await this.transactionHistory.create(mappingDataSave, tx);
          await this.etalaseRepository.update(
            findData.id,
            {
              stock: element.realStock,
            },
            tx
          );
        }
        await this.lockingRepository.removeLocking(data.vmId, tx);
      });
    } catch (error) {
      throw error;
    }
  }
}

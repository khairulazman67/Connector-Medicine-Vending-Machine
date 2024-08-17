import {
  createStockOpnamePayload,
  processStockOpnamePayload,
} from "../../utils/validations/StockOpnameRequest";
import { IStockOpnameRepository } from "../../repositories/StockOpnameRepository/IStockOpnameRepository";
import { IStockOpnameService } from "./IStockOpnameService";
import { inject, injectable } from "tsyringe";
import * as crypto from "node:crypto";
import {
  stockOpnameDtoCreate,
  stockOpnameTransactionHistoryDto,
} from "../../dtos/stockOpname.dto";
import { prisma } from "../../db";
import { StockOpnameStatus, TransactionHistoryType } from "@prisma/client";
import { ITransactionHistoryRepository } from "../../repositories/TransactionHistoryRepository/ITransactionHistoryRepository";
import { IEtalaseRepository } from "../../repositories/EtalaseRepository/IEtalaseRepository";
import { empty } from "@prisma/client/runtime/library";
import { date } from "zod";
import moment from "moment";
import {
  BadRouteError,
  NotFoundError,
} from "../../utils/errors/DynamicCustomError";
import { CustomError } from "../../utils/errors/CustomError";

@injectable()
export class StockOpnameService implements IStockOpnameService {
  constructor(
    @inject("IStockOpnameRepository")
    private stockOpnameRepository: IStockOpnameRepository,

    @inject("IEtalaseRepository")
    private etalaseRepository: IEtalaseRepository,

    @inject("ITransactionHistoryRepository")
    private transactionHistory: ITransactionHistoryRepository
  ) {}

  async createSO(data: createStockOpnamePayload): Promise<any> {
    try {
      await prisma.$transaction(async (tx) => {
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
    } catch (error) {
      if (error instanceof CustomError) {
        throw new NotFoundError(error.message);
      }
      throw new Error(`There is an error ${error}`);
    }
  }

  async processSO(data: processStockOpnamePayload): Promise<any | unknown> {
    try {
      if (
        !this.stockOpnameRepository.getStockOpname({
          soCode: data.soCode,
          status: StockOpnameStatus.PROCESS,
        })
      )
        throw new NotFoundError(`Stock Opname dengan kode ${data.soCode}`);

      await prisma.$transaction(async (tx) => {
        const newKodeSO = await this.stockOpnameRepository.generateSoCode(
          data.vmId,
          tx
        );
        const stockOpnameDto = await stockOpnameDtoCreate(data, {
          status: StockOpnameStatus.COMPLETED,
          soCode: newKodeSO,
        });

        const etalaseData = await this.etalaseRepository.getByVM(data.vmId);
        if (!etalaseData) {
          throw new NotFoundError(`Etalase vending machine ${data.vmId}`);
        }
        await this.stockOpnameRepository.processSO(stockOpnameDto, tx);

        for (const element of data.details) {
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
      });
    } catch (error) {
      if (error instanceof CustomError) {
        throw new NotFoundError(error.message);
      }
      throw new Error(`There is an error ${error}`);
    }
  }
}

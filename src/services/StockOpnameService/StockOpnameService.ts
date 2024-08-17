import { processStockOpnamePayload } from "../../utils/validations/StockOpnameRequest";
import { IStockOpnameRepository } from "../../repositories/StockOpnameRepository/IStockOpnameRepository";
import { IStockOpnameService } from "./IStockOpnameService";
import { inject, injectable } from "tsyringe";
import * as crypto from "node:crypto";
import {
  stockOpnameDtoCreate,
  stockOpnameTransactionHistoryDto,
} from "../../dtos/stockOpname.dto";
import { prisma } from "../../db";
import { TransactionHistoryType } from "@prisma/client";
import { ITransactionHistoryRepository } from "../../repositories/TransactionHistoryRepository/ITransactionHistoryRepository";
import { IEtalaseRepository } from "../../repositories/EtalaseRepository/IEtalaseRepository";
import { empty } from "@prisma/client/runtime/library";
import { date } from "zod";
import moment from "moment";

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

  async createSO(data: processStockOpnamePayload): Promise<any> {
    try {
      await prisma.$transaction(async (tx) => {
        const newKodeSO = await this.stockOpnameRepository.generateSoCode(
          data.vmId,
          tx
        );
        const stockOpnameDto = await stockOpnameDtoCreate(data, {
          soCode: newKodeSO,
        });

        const etalaseData = await this.etalaseRepository.getByVM(data.vmId);
        if (!etalaseData) {
          throw new Error(
            `Etalase vending machine ${data.vmId} tidak ditemukan`
          );
        }
        await this.stockOpnameRepository.createSO(stockOpnameDto, tx);

        for (const element of data.details) {
          const findData = etalaseData.find(
            (val) => val.id == element.etalaseId
          );

          if (!findData) {
            throw new Error(
              `Etalase id ${element.etalaseId} vending machine ${data.vmId} tidak ditemukan`
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
      throw new Error(`There is an error ${error}`);
    }

    return true;
  }
}

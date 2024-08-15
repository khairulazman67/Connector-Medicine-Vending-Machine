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
    await prisma.$transaction(async (tx) => {
      const stockOpnameDto = await stockOpnameDtoCreate(data, {
        soCode: crypto.randomBytes(20).toString("hex"),
      });

      const etalaseData = await this.etalaseRepository.getByVM(data.vmId);
      if (!etalaseData) {
        throw new Error(`Etalase vending machine ${data.vmId} tidak ditemukan`);
      }
      await this.stockOpnameRepository.createSO(stockOpnameDto, tx);

      for (const element of data.details) {
        const findData = etalaseData.find((val) => val.id == element.etalaseId);

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

    return true;
  }
  async generateSoCode(tx: any): Promise<any> {}
}

import { processStockOpnamePayload } from "../../utils/validations/StockOpnameRequest";
import { IStockOpnameRepository } from "../../repositories/StockOpnameRepository/IStockOpnameRepository";
import { IStockOpnameService } from "./IStockOpnameService";
import { inject, injectable } from "tsyringe";

import { stockOpnameDtoCreate } from "../../dtos/stockOpname.dto";
import { prisma } from "../../db";
import { TransactionHistory } from "@prisma/client";
import { ITransactionHistoryRepository } from "../../repositories/TransactionHistoryRepository/ITransactionHistoryRepository";

@injectable()
export class StockOpnameService implements IStockOpnameService {
  constructor(
    @inject("IStockOpnameRepository")
    private stockOpnameRepository: IStockOpnameRepository,

    @inject("ITransactionHistoryRepository")
    private transactionHistory: ITransactionHistoryRepository
  ) {}

  async createSO(data: processStockOpnamePayload): Promise<any> {
    await prisma.$transaction(async (tx) => {
      const stockOpnameDto = await stockOpnameDtoCreate(data, {
        soCode: "SO-0001",
      });

      const saveStockOpname = await this.stockOpnameRepository.createSO(
        stockOpnameDto,
        tx
      );

      // e Prisma.TransactionHistoryUncheckedCreateInput = {
      //   id?: number;
      //   vmId: number;
      //   displayCode: string;
      //   itemCode: string;
      //   locationCode: string;
      //   firstStock: number;
      //   lastStock: number;
      //   createdAt?: Date | string;
      //   transactionType: $Enums.TransactionHistoryType;
      //   status: $Enums.TransactionHistoryStatus;
      //   note: string;

      // data.details.forEach((element) => {
      //   this.transactionHistory.create(stockOpnameDto, tx);
      // });
      // const riwayatTransaksi = await this.transactionHistory.create(
      //   stockOpnameDto,
      //   tx
      // );

      return saveStockOpname;
    });
  }
  async generateSoCode(tx: any): Promise<any> {}
}

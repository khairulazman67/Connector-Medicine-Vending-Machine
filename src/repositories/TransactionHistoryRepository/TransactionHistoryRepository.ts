import { PrismaClient, Prisma, TransactionHistory } from "@prisma/client";
import { injectable } from "tsyringe";
import { prisma, TxPrismaClient } from "../../db";
import { ITransactionHistoryRepository } from "./ITransactionHistoryRepository";
@injectable()
export class TransactionHistoryRepository
  implements ITransactionHistoryRepository
{
  async create(
    data: Prisma.TransactionHistoryUncheckedCreateInput,
    tx: TxPrismaClient
  ): Promise<TransactionHistory> {
    console.log("dataa transaction history masok", data);
    return tx.transactionHistory.create({
      data,
    });
  }
}

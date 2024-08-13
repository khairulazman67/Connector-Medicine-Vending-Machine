import { PrismaClient, Prisma, TransactionHistory } from "@prisma/client";
import { TxPrismaClient } from "../../db";

export interface ITransactionHistoryRepository {
  create(
    data: Prisma.TransactionHistoryUncheckedCreateInput,
    tx: TxPrismaClient | PrismaClient
  ): Promise<TransactionHistory>;
}

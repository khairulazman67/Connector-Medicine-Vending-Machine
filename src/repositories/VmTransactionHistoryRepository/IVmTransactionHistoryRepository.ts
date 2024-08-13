import { PrismaClient, Prisma, VmTransactionHistory } from "@prisma/client";
import { TxPrismaClient } from "../../db";

export interface IVmTransactionHistoryRepository {
  create(
    data: Prisma.VmTransactionHistoryUncheckedCreateInput,
    tx: TxPrismaClient | PrismaClient
  ): Promise<VmTransactionHistory>;
}

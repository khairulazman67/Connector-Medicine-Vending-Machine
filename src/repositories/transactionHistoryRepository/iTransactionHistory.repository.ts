import { Prisma, TransactionHistory } from "@prisma/client";
import { TxPrismaClient } from "../../db";

export interface ITransactionHistoryRepository {
  create(
    data: Prisma.TransactionHistoryUncheckedCreateInput,
    tx: TxPrismaClient
  ): Promise<TransactionHistory>;

  getAllByVmId(
    vmId: number,
    tx?: TxPrismaClient
  ): Promise<TransactionHistory[]>;
}

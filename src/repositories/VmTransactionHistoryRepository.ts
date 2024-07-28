import { PrismaClient, Prisma, VmTransactionHistory } from "@prisma/client";
import { injectable } from "tsyringe";
import { prisma, TxPrismaClient } from "../db";
@injectable()
export class VmTransactionHistoryRepository {
  async create(
    data: Prisma.VmTransactionHistoryUncheckedCreateInput,
    tx: TxPrismaClient | PrismaClient = prisma
  ): Promise<VmTransactionHistory> {
    return tx.vmTransactionHistory.create({
      data,
    });
  }
}

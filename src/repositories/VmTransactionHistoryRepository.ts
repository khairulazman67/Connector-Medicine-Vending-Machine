import { PrismaClient, Prisma } from "@prisma/client";
import { injectable } from "tsyringe";
import { prisma, TxPrismaClient } from "../db";

@injectable()
export class VmTransactionHistoryRepository {
  async create(
    data: Prisma.VmTransactionHistoryUncheckedCreateInput,
    tx: TxPrismaClient | PrismaClient = prisma
  ) {
    return tx.vmTransactionHistory.create({
      data,
    });
  }
}

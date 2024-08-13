import { PrismaClient, Prisma, VmTransactionHistory } from "@prisma/client";
import { injectable } from "tsyringe";
import { prisma, TxPrismaClient } from "../../db";
import { IVmTransactionHistoryRepository } from "./IVmTransactionHistoryRepository";
@injectable()
export class VmTransactionHistoryRepository
  implements IVmTransactionHistoryRepository
{
  async create(
    data: Prisma.VmTransactionHistoryUncheckedCreateInput,
    tx: TxPrismaClient | PrismaClient = prisma
  ): Promise<VmTransactionHistory> {
    return tx.vmTransactionHistory.create({
      data,
    });
  }
}

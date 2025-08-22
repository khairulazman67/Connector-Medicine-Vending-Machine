import { Prisma, PrismaClient, TransactionHistory } from "@prisma/client";
import { injectable } from "tsyringe";
import { TxPrismaClient } from "../../db";
import { ITransactionHistoryRepository } from "./iTransactionHistory.repository";
@injectable()
export class TransactionHistoryRepository
  implements ITransactionHistoryRepository
{
  async create(
    data: Prisma.TransactionHistoryUncheckedCreateInput,
    tx: TxPrismaClient | PrismaClient
  ): Promise<TransactionHistory> {
    return tx.transactionHistory.create({
      data,
    });
  }

  async getAllByVmId(
    vmId: number,
    tx: TxPrismaClient,
    options: {
      cursor?: number;
      limit?: number;
      direction?: "next" | "prev";
    } = {}
  ): Promise<TransactionHistory[]> {
    const { cursor, limit = 10, direction = "next" } = options;

    return tx.transactionHistory.findMany({
      where: { vmId },
      take: direction === "next" ? limit : -limit, // next = maju, prev = mundur
      ...(cursor && {
        cursor: { id: cursor },
        skip: 1, // supaya data cursor tidak ikut ke hasil
      }),
      orderBy: { id: "asc" }, // pastikan konsisten
    });
  }
}

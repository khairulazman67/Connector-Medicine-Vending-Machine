import { injectable } from "tsyringe";
import {
  Prisma,
  PrismaClient,
  StockOpname,
  StockOpnameDetail,
} from "@prisma/client";
import { TxPrismaClient } from "../../db";
import { IStockOpnameRepository } from "./IStockOpnameRepository";

@injectable()
export class StockOpnameRepository implements IStockOpnameRepository {
  async createSO(
    data: Prisma.StockOpnameUncheckedCreateInput,
    tx: TxPrismaClient | PrismaClient
  ): Promise<StockOpname> {
    return tx.stockOpname.create({
      data,
      include: {
        details: true, // Termasuk detail dalam hasil query
      },
    });
  }

  async createSoDetail(
    data: Prisma.StockOpnameDetailUncheckedCreateInput,
    tx: TxPrismaClient | PrismaClient
  ): Promise<StockOpnameDetail> {
    return tx.stockOpnameDetail.create({ data });
  }
}

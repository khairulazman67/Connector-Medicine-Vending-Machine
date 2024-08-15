import {
  Prisma,
  PrismaClient,
  StockOpname,
  StockOpnameDetail,
} from "@prisma/client";
import { TxPrismaClient } from "../../db";
import { IStockOpnameRepository } from "./IStockOpnameRepository";
import { injectable } from "tsyringe";

@injectable()
export class StockOpnameRepository implements IStockOpnameRepository {
  async createSO(
    data: Prisma.StockOpnameUncheckedCreateInput,
    tx: TxPrismaClient
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

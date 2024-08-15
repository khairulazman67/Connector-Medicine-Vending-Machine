import {
  Prisma,
  PrismaClient,
  StockOpname,
  StockOpnameDetail,
} from "@prisma/client";
import { TxPrismaClient } from "../../db";

export interface IStockOpnameRepository {
  createSO(
    data: Prisma.StockOpnameUncheckedCreateInput,
    tx: TxPrismaClient | PrismaClient
  ): Promise<StockOpname>;

  createSoDetail(
    data: Prisma.StockOpnameDetailUncheckedCreateInput,
    tx: TxPrismaClient | PrismaClient
  ): Promise<StockOpnameDetail>;
}

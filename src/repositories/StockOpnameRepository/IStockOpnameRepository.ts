import {
  Prisma,
  PrismaClient,
  StockOpname,
  StockOpnameDetail,
} from "@prisma/client";
import { TxPrismaClient } from "../../db";
import { StockOpnameWhereAnd } from "../../types/stockOpnameType";

export interface IStockOpnameRepository {
  getStockOpname(params: StockOpnameWhereAnd): Promise<StockOpname | null>;
  createSO(
    data: Prisma.StockOpnameUncheckedCreateInput,
    tx: TxPrismaClient | PrismaClient
  ): Promise<StockOpname>;

  processSO(
    data: Prisma.StockOpnameUncheckedCreateInput,
    tx: TxPrismaClient
  ): Promise<StockOpname>;

  createSoDetail(
    data: Prisma.StockOpnameDetailUncheckedCreateInput,
    tx: TxPrismaClient | PrismaClient
  ): Promise<StockOpnameDetail>;

  generateSoCode(
    vmId: number,
    tx: TxPrismaClient | PrismaClient,
    date?: string
  ): Promise<string>;
}

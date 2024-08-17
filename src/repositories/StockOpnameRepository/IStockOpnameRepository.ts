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

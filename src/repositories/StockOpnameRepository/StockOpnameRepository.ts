import {
  Prisma,
  PrismaClient,
  StockOpname,
  StockOpnameDetail,
} from "@prisma/client";
import { prisma, TxPrismaClient } from "../../db";
import { IStockOpnameRepository } from "./IStockOpnameRepository";
import { injectable } from "tsyringe";
import moment from "moment";
import { StockOpnameWhereAnd } from "../../types/stockOpnameType";

@injectable()
export class StockOpnameRepository implements IStockOpnameRepository {
  async createSO(
    data: Prisma.StockOpnameUncheckedCreateInput,
    tx: TxPrismaClient | PrismaClient
  ): Promise<StockOpname> {
    return tx.stockOpname.create({
      data,
    });
  }
  async getStockOpname(
    params: StockOpnameWhereAnd
  ): Promise<StockOpname | null> {
    return await prisma.stockOpname.findFirst({
      where: {
        ...params,
      },
      include: {
        details: true,
      },
    });
  }

  async getStockOpnames(
    params: StockOpnameWhereAnd,
    tx: TxPrismaClient
  ): Promise<StockOpname[]> {
    return await tx.stockOpname.findMany({
      where: {
        ...params,
      },
      include: {
        details: true,
      },
    });
  }

  async processSO(
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

  async updateSo(
    data: Prisma.StockOpnameUncheckedUpdateInput,
    id: {
      soId?: number;
      soCode?: string;
    },
    tx: TxPrismaClient | PrismaClient
  ): Promise<StockOpname> {
    return tx.stockOpname.update({
      data,
      where: { id: id.soId, soCode: id.soCode },
    });
  }

  async generateSoCode(
    vmId: number,
    tx: TxPrismaClient | PrismaClient,
    date: string = moment().format("YYYYMMDD")
  ): Promise<string> {
    const nextData = await tx.$queryRaw<{ next_increment: number }[]>`
    SELECT COALESCE(MAX(CAST(RIGHT(so_code, 2) AS INTEGER)), 0)+1 AS next_increment
    FROM "StockOpname"
    WHERE so_code LIKE CONCAT('SO-', ${date}, '-', ${vmId}, '%') and vm_id = ${vmId}`;

    const nextValue = nextData?.[0]?.next_increment ?? 1;
    return `SO-${date}-${vmId}${nextValue.toString().padStart(2, "0")}`;
  }
}

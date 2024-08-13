import { Etalase, Prisma, PrismaClient } from "@prisma/client";
import { injectable } from "tsyringe";
import { prisma, TxPrismaClient } from "../../db";

export interface IEtalaseRepository {
  create(data: Prisma.EtalaseUncheckedCreateInput): Promise<Etalase>;
  update(
    id: number,
    data: Partial<Etalase>,
    tx?: TxPrismaClient | PrismaClient
  ): Promise<any>;

  getAll(): Promise<Etalase[]>;
  delete(id: number): Promise<Etalase>;
  getById(id: number): Promise<Etalase | null>;
  getByItemVm(idVm: number, itemCode: string): Promise<Etalase | null>;
}

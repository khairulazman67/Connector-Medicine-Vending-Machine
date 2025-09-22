import { Etalase, Prisma, PrismaClient } from "@prisma/client";
import { TxPrismaClient } from "../../db";

export interface IEtalaseRepository {
  create(data: Prisma.EtalaseUncheckedCreateInput): Promise<Etalase>;
  update(
    id: number,
    data: Prisma.EtalaseUpdateInput,
    tx?: TxPrismaClient | PrismaClient
  ): Promise<any>;
  getAll(): Promise<Etalase[]>;
  delete(id: number): Promise<Etalase>;
  getById(id: number): Promise<Etalase | null>;
  getByItemVm(vmId: number, itemCode: string): Promise<Etalase | null>;
  getByVM(vmId: number): Promise<Etalase[] | null>;
}

import { VmEtalase, Prisma, PrismaClient } from "@prisma/client";
import { injectable } from "tsyringe";
import { TxPrismaClient } from "../../db";

export interface IVMEtalaseRepository {
  create(data: Prisma.VmEtalaseUncheckedCreateInput): Promise<VmEtalase>;
  update(
    id: number,
    data: Partial<VmEtalase>,
    tx: TxPrismaClient | PrismaClient
  ): Promise<any>;

  getAll(): Promise<VmEtalase[]>;
  delete(id: number): Promise<VmEtalase>;
  getById(id: number): Promise<VmEtalase | null>;
  getByItemVm(idVm: number, itemCode: string): Promise<VmEtalase | null>;
}

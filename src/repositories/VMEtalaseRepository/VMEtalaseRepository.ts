import { VmEtalase, Prisma, PrismaClient } from "@prisma/client";
import { injectable } from "tsyringe";
import { prisma, TxPrismaClient } from "../../db";
import { IVMEtalaseRepository } from "./IVMEtalaseRepository";

@injectable()
export class VMEtalaseRepository implements IVMEtalaseRepository {
  async create(data: Prisma.VmEtalaseUncheckedCreateInput): Promise<VmEtalase> {
    return prisma.vmEtalase.create({
      data,
    });
  }

  async update(
    id: number,
    data: Partial<VmEtalase>,
    tx: TxPrismaClient | PrismaClient = prisma
  ) {
    return tx.vmEtalase.update({ where: { id }, data });
  }

  async getAll(): Promise<VmEtalase[]> {
    return prisma.vmEtalase.findMany({
      include: {
        vendingMachine: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  async delete(id: number): Promise<VmEtalase> {
    return prisma.vmEtalase.delete({ where: { id } });
  }

  async getById(id: number): Promise<VmEtalase | null> {
    const getDataById = await prisma.vmEtalase.findUnique({
      where: { id },
      include: {
        vendingMachine: {
          select: {
            name: true,
          },
        },
      },
    });
    if (!getDataById)
      throw new Error(`Vending machine etalase with id ${id} not found`);
    return getDataById;
  }

  async getByItemVm(idVm: number, itemCode: string): Promise<VmEtalase | null> {
    const getDataById = await prisma.vmEtalase.findMany({
      where: {
        idVm: idVm,
        itemCode: itemCode,
      },
    });

    if (!getDataById || getDataById.length <= 0)
      throw new Error(
        `Etalase vending machine ${idVm} dan kode obat ${itemCode} tidak ditemukan`
      );
    return getDataById[0];
  }
}

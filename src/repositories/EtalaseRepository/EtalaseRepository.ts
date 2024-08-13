import { Etalase, Prisma, PrismaClient } from "@prisma/client";
import { injectable } from "tsyringe";
import { prisma, TxPrismaClient } from "../../db";
import { IEtalaseRepository } from "./IEtalaseRepository";

@injectable()
export class EtalaseRepository implements IEtalaseRepository {
  async create(data: Prisma.EtalaseUncheckedCreateInput): Promise<Etalase> {
    return prisma.etalase.create({
      data,
    });
  }

  async update(
    id: number,
    data: Partial<Etalase>,
    tx: TxPrismaClient | PrismaClient = prisma
  ) {
    return tx.etalase.update({ where: { id }, data });
  }

  async getAll(): Promise<Etalase[]> {
    return prisma.etalase.findMany({
      include: {
        vendingMachine: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  async delete(id: number): Promise<Etalase> {
    return prisma.etalase.delete({ where: { id } });
  }

  async getById(id: number): Promise<Etalase | null> {
    const getDataById = await prisma.etalase.findUnique({
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

  async getByItemVm(idVm: number, itemCode: string): Promise<Etalase | null> {
    const getDataById = await prisma.etalase.findMany({
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

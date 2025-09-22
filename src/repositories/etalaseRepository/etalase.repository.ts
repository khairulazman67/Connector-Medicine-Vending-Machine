import { Etalase, Prisma, PrismaClient } from "@prisma/client";
import { prisma, TxPrismaClient } from "../../db";
import { NotFoundError } from "../../utils/errors/dynamicCustom.error";
import { IEtalaseRepository } from "./iEtalase.repository";

export class EtalaseRepository implements IEtalaseRepository {
  async create(data: Prisma.EtalaseUncheckedCreateInput): Promise<Etalase> {
    return prisma.etalase.create({
      data,
    });
  }

  async update(
    id: number,
    data: Prisma.EtalaseUpdateInput,
    tx: TxPrismaClient | PrismaClient = prisma
  ) {
    return tx.etalase.update({
      where: { id } as Prisma.EtalaseWhereUniqueInput,
      data,
    });
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

    return getDataById;
  }

  async getByItemVm(vmId: number, itemCode: string): Promise<Etalase | null> {
    const getDataById = await prisma.etalase.findMany({
      where: {
        vmId: vmId,
        itemCode: itemCode,
      },
    });

    if (!getDataById || getDataById.length <= 0)
      throw new NotFoundError(
        `Etalase vending machine ${vmId} dan kode obat ${itemCode}`
      );
    return getDataById[0];
  }

  async getByVM(vmId: number): Promise<Etalase[] | null> {
    const getDataById = await prisma.etalase.findMany({
      where: {
        vmId: vmId,
      },
    });
    if (!getDataById || getDataById.length <= 0)
      throw new NotFoundError(`Etalase vending machine ${vmId}`);
    return getDataById;
  }
}

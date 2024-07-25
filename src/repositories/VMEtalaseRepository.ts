import {
  PrismaClient,
  VmEtalase,
  Prisma,
  VendingMachine,
} from "@prisma/client";
import { injectable } from "tsyringe";
import { prisma } from "../db";
import { VendingMachineRepository } from "./VendingMachineRepository";

@injectable()
export class VMEtalaseRepository {
  async create(data: Prisma.VmEtalaseUncheckedCreateInput): Promise<VmEtalase> {
    return prisma.vmEtalase.create({
      data,
    });
  }

  async update(id: number, data: Partial<VmEtalase>): Promise<VmEtalase> {
    return prisma.vmEtalase.update({ where: { id }, data });
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
}

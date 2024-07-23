import { PrismaClient, VendingMachine, Prisma } from "@prisma/client";
import { injectable } from "tsyringe";
import { prisma } from "../db";

@injectable()
export class VendingMachineRepository {
  async getAll(): Promise<VendingMachine[]> {
    return prisma.vendingMachine.findMany();
  }

  async getById(id: number): Promise<VendingMachine | null> {
    const getDataById = await prisma.vendingMachine.findUnique({
      where: { id },
    });
    if (!getDataById)
      throw new Error(`Vending machine with id ${id} not found`);
    return getDataById;
  }

  async create(
    data: Prisma.VendingMachineCreateInput
  ): Promise<VendingMachine> {
    return prisma.vendingMachine.create({
      data,
    });
  }

  async update(
    id: number,
    data: Partial<VendingMachine>
  ): Promise<VendingMachine> {
    return prisma.vendingMachine.update({ where: { id }, data });
  }

  async delete(id: number): Promise<VendingMachine> {
    return prisma.vendingMachine.delete({ where: { id } });
  }
}

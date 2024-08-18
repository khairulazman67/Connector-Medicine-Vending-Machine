import { PrismaClient, VendingMachine, Prisma } from "@prisma/client";
import { injectable } from "tsyringe";
import { prisma } from "../../db";
import { VendingMachinePayload } from "../../utils/validations/VendingMachineRequest";
import { NotFoundError } from "../../utils/errors/DynamicCustomError";

@injectable()
export class VendingMachineRepository {
  async getAll(): Promise<VendingMachine[]> {
    return prisma.vendingMachine.findMany();
  }

  async getById(id: number): Promise<VendingMachine | null> {
    const getDataById = await prisma.vendingMachine.findUnique({
      where: { id },
    });
    if (!getDataById) throw new NotFoundError(`Vending machine with id ${id}`);
    return getDataById;
  }

  async create(data: VendingMachinePayload): Promise<VendingMachine> {
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

import { PrismaClient, VendingMachine } from "@prisma/client";
import { injectable } from "tsyringe";
import { prisma } from "../db";

@injectable()
export class VendingMachineRepository {
  async getAll(): Promise<VendingMachine[]> {
    return prisma.vendingMachine.findMany();
  }

  async getById(id: number): Promise<VendingMachine | null> {
    return prisma.vendingMachine.findUnique({ where: { id } });
  }

  async create(dataSave: any): Promise<VendingMachine> {
    const finalSave = {
      name: dataSave.name,
      isPaperlessHospital: dataSave.is_paperless_hospital,
    };

    return prisma.vendingMachine.create({
      data: finalSave,
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

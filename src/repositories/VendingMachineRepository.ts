import { PrismaClient, VendingMachine } from "@prisma/client";
import { injectable } from "tsyringe";
import { VendingMachinePayload } from "../utils/validations/vendingMachineRequest";

@injectable()
export class VendingMachineRepository {
  private prisma = new PrismaClient();

  async getAll(): Promise<VendingMachine[]> {
    return this.prisma.vendingMachine.findMany();
  }

  async getById(id: number): Promise<VendingMachine | null> {
    return this.prisma.vendingMachine.findUnique({ where: { id } });
  }

  async create(dataSave: any): Promise<VendingMachine> {
    const finalSave = {
      name: dataSave.name,
      isPaperlessHospital: dataSave.is_paperless_hospital,
    };

    return this.prisma.vendingMachine.create({
      data: finalSave,
    });
  }

  async update(
    id: number,
    data: Partial<VendingMachine>
  ): Promise<VendingMachine> {
    return this.prisma.vendingMachine.update({ where: { id }, data });
  }

  async delete(id: number): Promise<VendingMachine> {
    return this.prisma.vendingMachine.delete({ where: { id } });
  }
}

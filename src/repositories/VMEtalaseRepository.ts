import { PrismaClient, VmEtalase, Prisma } from "@prisma/client";
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
}

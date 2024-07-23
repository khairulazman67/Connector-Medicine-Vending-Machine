import { PrismaClient, VmEtalase, Prisma } from "@prisma/client";
import { injectable } from "tsyringe";
import { prisma } from "../db";

@injectable()
export class VMEtalaseRepository {
  async create(data: Prisma.VmEtalaseCreateInput): Promise<VmEtalase> {
    return prisma.vmEtalase.create({
      data,
    });
  }
}

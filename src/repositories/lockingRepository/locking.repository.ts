import { Locking, Prisma, PrismaClient } from "@prisma/client";
import { TxPrismaClient } from "../../db";

export class LockingRepository {
  async createLocking(
    data: Prisma.LockingUncheckedCreateInput,
    tx: TxPrismaClient | PrismaClient
  ): Promise<Locking> {
    return await tx.locking.create({
      data,
    });
  }
  async removeLocking(
    vmId: number,
    tx: TxPrismaClient | PrismaClient
  ): Promise<Locking> {
    return await tx.locking.delete({
      where: {
        vmId: vmId,
      },
    });
  }
}

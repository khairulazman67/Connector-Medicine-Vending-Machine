import { Locking, Prisma, PrismaClient } from "@prisma/client";
import { TxPrismaClient } from "../../db";

export interface ILockingRepository {
  createLocking(
    data: Prisma.LockingUncheckedCreateInput,
    tx: TxPrismaClient | PrismaClient
  ): Promise<Locking>;
  removeLocking(
    vmId: number,
    tx: TxPrismaClient | PrismaClient
  ): Promise<Locking>;
}

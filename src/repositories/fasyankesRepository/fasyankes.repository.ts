import { Fasyankes, Prisma } from "@prisma/client";
import { prisma } from "../../db";
import { IFasyankesRepository } from "./iFasyankes.repository";

export class FasyankesRepository implements IFasyankesRepository {
  async getByFasyankesCode(fasyankesCode: string): Promise<Fasyankes | null> {
    return await prisma.fasyankes.findFirst({
      where: { fasyankesCode },
    });
  }

  async createFasyankes(
    data: Prisma.FasyankesUncheckedCreateInput
  ): Promise<Fasyankes | null> {
    return await prisma.fasyankes.create({
      data,
    });
  }

  async updateFasyankes(
    id: number,
    data: Prisma.FasyankesUncheckedCreateInput
  ): Promise<Fasyankes | null> {
    return await prisma.fasyankes.update({
      data,
      where: { id },
    });
  }

  async deleteFasyankes(id: number): Promise<Fasyankes | null> {
    return await prisma.fasyankes.delete({
      where: { id },
    });
  }
}

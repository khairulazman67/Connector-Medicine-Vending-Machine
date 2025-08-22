import { Fasyankes, Prisma } from "@prisma/client";

export interface IFasyankesRepository {
  getByFasyankesCode(fasyankesCode: string): Promise<Fasyankes | null>;
  createFasyankes(
    data: Prisma.FasyankesUncheckedCreateInput
  ): Promise<Fasyankes | null>;
  updateFasyankes(
    id: number,
    data: Prisma.FasyankesUncheckedCreateInput
  ): Promise<Fasyankes | null>;
  deleteFasyankes(id: number): Promise<Fasyankes | null>;
}

import { Fasyankes } from "@prisma/client";

export interface IFasyankesService {
  getFasyankesByFasyankesCode(fasyankesCode: string): Promise<Fasyankes | null>;
}

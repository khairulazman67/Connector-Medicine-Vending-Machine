import { EtalaseCreatePayload } from "../../utils/validations/EtalaseRequest";
import { Etalase } from "@prisma/client";

export interface IEtalaseService {
  createVMEtalase(data: EtalaseCreatePayload): Promise<Etalase>;
  getAllVMEtalase(): Promise<Etalase[] | null>;
  updateVMEtalase(id: number, data: Partial<Etalase>): Promise<Etalase>;
  getVMEtalaseById(id: number): Promise<Etalase | null>;
  deleteVMEtalase(id: number): Promise<Etalase>;
}

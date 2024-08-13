import { VMEtalaseCreatePayload } from "../../utils/validations/vmEtalaseRequest";
import { VmEtalase } from "@prisma/client";

export interface IVMEtalaseService {
  createVMEtalase(data: VMEtalaseCreatePayload): Promise<VmEtalase>;

  getAllVMEtalase(): Promise<VmEtalase[] | null>;

  updateVMEtalase(id: number, data: Partial<VmEtalase>): Promise<VmEtalase>;

  getVMEtalaseById(id: number): Promise<VmEtalase | null>;

  deleteVMEtalase(id: number): Promise<VmEtalase>;
}

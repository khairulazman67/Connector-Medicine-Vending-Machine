import { VendingMachine } from "@prisma/client";
import { VendingMachinePayload } from "../../utils/validations/vendingMachine.request";

export interface IVendingMachineService {
  getAllVendingMachines(): Promise<VendingMachine[]>;
  getVmForMyFasyankes(fasyankesCode: string): Promise<VendingMachine[]>;
  getVendingMachineById(id: number): Promise<any>;
  createVendingMachine(data: VendingMachinePayload): Promise<any>;
  updateVendingMachine(id: number, data: Partial<VendingMachine>): Promise<any>;
  deleteVendingMachine(id: number): Promise<any>;
}

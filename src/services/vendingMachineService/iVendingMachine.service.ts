import { injectable, inject } from "tsyringe";
import { VendingMachineRepository } from "../../repositories/vendingMachineRepository/vendingMachine.repository";
import { VendingMachine } from "@prisma/client";
import { VendingMachinePayload } from "../../utils/validations/vendingMachine.request";

export interface IVendingMachineService {
  getAllVendingMachines(): Promise<any>;
  getVendingMachineById(id: number): Promise<any>;
  createVendingMachine(data: VendingMachinePayload): Promise<any>;
  updateVendingMachine(id: number, data: Partial<VendingMachine>): Promise<any>;
  deleteVendingMachine(id: number): Promise<any>;
}

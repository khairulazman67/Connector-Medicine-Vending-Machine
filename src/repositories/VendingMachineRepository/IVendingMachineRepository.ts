import { VendingMachine } from "@prisma/client";
import { VendingMachinePayload } from "../../utils/validations/vendingMachineRequest";

export interface IVendingMachineRepository {
  getAll(): Promise<VendingMachine[]>;

  getById(id: number): Promise<VendingMachine | null>;

  create(data: VendingMachinePayload): Promise<VendingMachine>;
  update(id: number, data: Partial<VendingMachine>): Promise<VendingMachine>;

  delete(id: number): Promise<VendingMachine>;
}

import { injectable, inject } from "tsyringe";
import { VendingMachineRepository } from "../repositories/VendingMachineRepository";
import { VendingMachine } from "@prisma/client";
import { VendingMachinePayload } from "../utils/validations/vendingMachineRequest";

@injectable()
export class VendingMachineService {
  constructor(
    @inject(VendingMachineRepository)
    private vendingMachineRepository: VendingMachineRepository
  ) {}

  async getAllVendingMachines() {
    return this.vendingMachineRepository.getAll();
  }

  async getVendingMachineById(id: number) {
    return this.vendingMachineRepository.getById(id);
  }

  async createVendingMachine(data: VendingMachinePayload) {
    // throw new Error("Value must be greater than 0");
    return this.vendingMachineRepository.create(data);
  }

  async updateVendingMachine(id: number, data: Partial<VendingMachine>) {
    return this.vendingMachineRepository.update(id, data);
  }

  async deleteVendingMachine(id: number) {
    return this.vendingMachineRepository.delete(id);
  }
}

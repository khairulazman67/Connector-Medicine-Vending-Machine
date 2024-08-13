import { injectable, inject } from "tsyringe";
import { VendingMachineRepository } from "../../repositories/VendingMachineRepository/VendingMachineRepository";
import { VendingMachine } from "@prisma/client";
import { VendingMachinePayload } from "../../utils/validations/vendingMachineRequest";
import { IVendingMachineService } from "./IVendingMachineService";
import { IVendingMachineRepository } from "../../repositories/VendingMachineRepository/IVendingMachineRepository";

@injectable()
export class VendingMachineService implements IVendingMachineService {
  constructor(
    @inject("IVendingMachineRepository")
    private vendingMachineRepository: IVendingMachineRepository
  ) {}

  async getAllVendingMachines() {
    return this.vendingMachineRepository.getAll();
  }

  async getVendingMachineById(id: number) {
    return this.vendingMachineRepository.getById(id);
  }

  async createVendingMachine(data: VendingMachinePayload) {
    return this.vendingMachineRepository.create(data);
  }

  async updateVendingMachine(id: number, data: Partial<VendingMachine>) {
    await this.getVendingMachineById(id);
    return this.vendingMachineRepository.update(id, data);
  }

  async deleteVendingMachine(id: number) {
    return this.vendingMachineRepository.delete(id);
  }
}

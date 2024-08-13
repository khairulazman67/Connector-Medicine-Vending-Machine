import { injectable, inject } from "tsyringe";
import { VMEtalaseRepository } from "../../repositories/VMEtalaseRepository/VMEtalaseRepository";
import { VMEtalaseCreatePayload } from "../../utils/validations/vmEtalaseRequest";
import { PrismaClient, VmEtalase, Prisma } from "@prisma/client";
import { VendingMachineRepository } from "../../repositories/VendingMachineRepository/VendingMachineRepository";

@injectable()
export class VMEtalaseService {
  constructor(
    @inject(VMEtalaseRepository)
    private vmEtalaseRepository: VMEtalaseRepository
  ) {}

  // async createVMEtalase(data: VMEtalaseCreatePayload) {
  async createVMEtalase(data: VMEtalaseCreatePayload) {
    return this.vmEtalaseRepository.create(data);
  }

  async getAllVMEtalase() {
    return this.vmEtalaseRepository.getAll();
  }

  async updateVMEtalase(id: number, data: Partial<VmEtalase>) {
    await this.getVMEtalaseById(id);
    return this.vmEtalaseRepository.update(id, data);
  }

  async getVMEtalaseById(id: number) {
    return this.vmEtalaseRepository.getById(id);
  }

  async deleteVMEtalase(id: number) {
    return this.vmEtalaseRepository.delete(id);
  }
}

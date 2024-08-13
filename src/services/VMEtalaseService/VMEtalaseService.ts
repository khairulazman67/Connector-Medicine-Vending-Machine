import { injectable, inject } from "tsyringe";
import { VMEtalaseCreatePayload } from "../../utils/validations/vmEtalaseRequest";
import { VmEtalase } from "@prisma/client";
import { IVMEtalaseRepository } from "../../repositories/VMEtalaseRepository/IVMEtalaseRepository";
import { IVMEtalaseService } from "./IVMEtalaseService";

@injectable()
export class VMEtalaseService implements IVMEtalaseService {
  constructor(
    @inject("IVMEtalaseRepository")
    private vmEtalaseRepository: IVMEtalaseRepository
  ) {}

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

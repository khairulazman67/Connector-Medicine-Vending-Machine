import { injectable, inject } from "tsyringe";
import { VMEtalaseRepository } from "../repositories/VMEtalaseRepository";

@injectable()
export class VMEtalaseService {
  constructor(
    @inject(VMEtalaseRepository)
    private vmEtalaseRepository: VMEtalaseRepository
  ) {}

  // async createVMEtalase(data: VMEtalaseCreatePayload) {
  async createVMEtalase(data: any) {
    return this.vmEtalaseRepository.create(data);
  }
}

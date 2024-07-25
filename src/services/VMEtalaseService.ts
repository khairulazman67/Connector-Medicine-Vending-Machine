import { injectable, inject } from "tsyringe";
import { VMEtalaseRepository } from "../repositories/VMEtalaseRepository";
import { VMEtalaseCreatePayload } from "../utils/validations/vmEtalaseRequest";
import { PrismaClient, VmEtalase, Prisma } from "@prisma/client";
import { VendingMachineRepository } from "../repositories/VendingMachineRepository";

@injectable()
export class VMEtalaseService {
  constructor(
    @inject(VMEtalaseRepository)
    private vmEtalaseRepository: VMEtalaseRepository,
    private vendingMachineRepository: VendingMachineRepository
  ) {}

  // async createVMEtalase(data: VMEtalaseCreatePayload) {
  async createVMEtalase(data: VMEtalaseCreatePayload) {
    return this.vmEtalaseRepository.create(data);
  }
}

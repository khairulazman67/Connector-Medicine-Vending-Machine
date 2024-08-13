import { injectable, inject } from "tsyringe";
import { VMEtalaseRepository } from "../../repositories/VMEtalaseRepository/VMEtalaseRepository";
import { VMEtalaseCreatePayload } from "../../utils/validations/vmEtalaseRequest";
import { PrismaClient, VmEtalase, Prisma } from "@prisma/client";
import { VendingMachineRepository } from "../../repositories/VendingMachineRepository/VendingMachineRepository";

export interface IVMEtalaseService {
  // async createVMEtalase(data: VMEtalaseCreatePayload) {
  createVMEtalase(data: VMEtalaseCreatePayload): Promise<VmEtalase>;

  getAllVMEtalase(): Promise<VmEtalase[] | null>;

  updateVMEtalase(id: number, data: Partial<VmEtalase>): Promise<VmEtalase>;

  getVMEtalaseById(id: number): Promise<VmEtalase | null>;

  deleteVMEtalase(id: number): Promise<VmEtalase>;
}

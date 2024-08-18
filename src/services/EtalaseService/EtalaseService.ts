import { injectable, inject } from "tsyringe";
import { EtalaseCreatePayload } from "../../utils/validations/EtalaseRequest";
import { Etalase } from "@prisma/client";
import { IEtalaseRepository } from "../../repositories/EtalaseRepository/IEtalaseRepository";
import { IEtalaseService } from "./IEtalaseService";

@injectable()
export class EtalaseService implements IEtalaseService {
  constructor(
    @inject("IEtalaseRepository")
    private etalaseRepository: IEtalaseRepository
  ) {}

  async createVMEtalase(data: EtalaseCreatePayload) {
    return this.etalaseRepository.create(data);
  }

  async getAllVMEtalase() {
    return this.etalaseRepository.getAll();
  }

  async updateVMEtalase(id: number, data: Partial<Etalase>) {
    await this.getVMEtalaseById(id);
    return this.etalaseRepository.update(id, data);
  }

  async getVMEtalaseById(id: number) {
    return this.etalaseRepository.getById(id);
  }

  async deleteVMEtalase(id: number) {
    return this.etalaseRepository.delete(id);
  }
}

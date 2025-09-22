import { Prisma } from "@prisma/client";
import { inject, injectable } from "tsyringe";
import { IEtalaseRepository } from "../../repositories/etalaseRepository/iEtalase.repository";
import { NotFoundError } from "../../utils/errors/dynamicCustom.error";
import { EtalaseCreatePayload } from "../../utils/validations/etalase.request";
import { IEtalaseService } from "./iEtalase.service";

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

  async updateVMEtalase(id: number, data: Prisma.EtalaseUpdateInput) {
    const etalase = await this.etalaseRepository.getById(id);

    if (etalase === null) {
      throw new NotFoundError(
        `Vending machine etalase with id ${id} is not found`
      );
    }

    const dataSave: Prisma.EtalaseUpdateInput = {
      displayCode: data.displayCode ?? etalase.displayCode,
      itemCode: data.itemCode ?? etalase.itemCode,
      medicineName: data.medicineName ?? etalase.medicineName,
      maxStock: data.maxStock ?? etalase.maxStock,
      stock: data.stock ?? etalase.stock,
    };

    return this.etalaseRepository.update(id, dataSave);
  }

  async getVMEtalaseById(id: number) {
    const etalase = await this.etalaseRepository.getById(id);
    if (!etalase) {
      throw new NotFoundError(
        `Vending machine etalase with id ${id} is not found`
      );
    }
    return etalase;
  }

  async deleteVMEtalase(id: number) {
    return this.etalaseRepository.delete(id);
  }
}

import { processStockOpnamePayload } from "../../utils/validations/StockOpnameRequest";
import { IStockOpnameRepository } from "../../repositories/StockOpnameRepository/IStockOpnameRepository";
import { IStockOpnameService } from "./IStockOpnameService";
import { inject, injectable } from "tsyringe";

import { stockOpnameDtoCreate } from "../../dtos/stockOpname.dto";
import { prisma } from "../../db";

@injectable()
export class StockOpnameService implements IStockOpnameService {
  constructor(
    @inject("IStockOpnameRepository")
    private stockOpnameRepository: IStockOpnameRepository
  ) {}

  async createSO(data: processStockOpnamePayload): Promise<any> {
    await prisma.$transaction(async (tx) => {
      const stockOpnameDto = await stockOpnameDtoCreate(data, {
        soCode: "SO-0001",
      });

      const saveStockOpname = await this.stockOpnameRepository.createSO(
        stockOpnameDto,
        tx
      );

      return saveStockOpname;
    });
  }
  async generateSoCode(tx: any): Promise<any> {}
}

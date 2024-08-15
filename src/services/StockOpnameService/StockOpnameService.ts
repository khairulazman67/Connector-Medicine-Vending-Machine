import { Prisma } from "@prisma/client";
import {
  createDetailStockOpnameDTO,
  createDetailStockOpnameSchema,
  createStockOpnameDTO,
  createStockOpnameSchema,
  processStockOpnamePayload,
} from "../../utils/validations/StockOpnameRequest";
import { IStockOpnameService } from "./IStockOpnameService";
import { inject } from "tsyringe";
import { IStockOpnameRepository } from "../../repositories/StockOpnameRepository/IStockOpnameRepository";
import { stockOpnameDtoCreate } from "../../dtos/stockOpname.dto";
import { prisma } from "../../db";

export class StockOpnameService implements IStockOpnameService {
  // constructor(
  //   @inject("IStockOpnameRepository")
  //   private stockOpnameRepository: IStockOpnameRepository
  // ) {}

  async createSO(data: processStockOpnamePayload): Promise<any> {
    //   type Prisma.StockOpnameUncheckedCreateInput = {
    //     id?: number;
    //     soCode: string;
    //     vmId: number;
    //     note: string;
    //     soDateTime?: Date | string;
    //     createdAt?: Date | string;
    //     details?: Prisma.StockOpnameDetailUncheckedCreateNestedManyWithoutStockOpnameInput;
    // }

    //   (alias) type processStockOpnamePayload = {
    //     vmId: number;
    //     note: string;
    //     soDateTime: Date;
    //     details: {
    //         etalaseId: number;
    //         stock: number;
    //         realStock: number;
    //     }[];
    // }

    await prisma.$transaction(async (tx) => {
      const stockOpnameDto = await stockOpnameDtoCreate(data, {
        soCode: "SO-0001",
      });

      // const saveStockOpname = await this.stockOpnameRepository.createSO(
      //   stockOpnameDto,
      //   tx
      // );

      return "saveStockOpname";
    });
  }
  async generateSoCode(tx: any): Promise<any> {}
}

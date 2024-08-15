import { Request, Response, NextFunction } from "express";
import { autoInjectable, inject } from "tsyringe";
import { FormatterResponse } from "../utils/response/formatterResponse";
import { IStockOpnameService } from "../services/StockOpnameService/IStockOpnameService";
import { processStockOpnameSchema } from "../utils/validations/StockOpnameRequest";

@autoInjectable()
export class StockOpnameController {
  constructor(
    @inject("IStockOpnameService")
    private stockOpnameService: IStockOpnameService
  ) {}

  async processSo(req: Request, res: Response, next: NextFunction) {
    try {
      const process = await this.stockOpnameService.createSO(req.body);
      res.json(FormatterResponse.success(process, "SO berhasil di proses"));
    } catch (error) {
      next(error);
    }
  }
}

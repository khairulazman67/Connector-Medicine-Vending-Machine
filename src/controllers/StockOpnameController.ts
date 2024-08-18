import { Request, Response, NextFunction } from "express";
import { autoInjectable, inject } from "tsyringe";
import { FormatterResponse } from "../utils/response/formatterResponse";
import { IStockOpnameService } from "../services/StockOpnameService/IStockOpnameService";

@autoInjectable()
export class StockOpnameController {
  constructor(
    @inject("IStockOpnameService")
    private stockOpnameService: IStockOpnameService
  ) {}

  async createSO(req: Request, res: Response, next: NextFunction) {
    try {
      const proses = await this.stockOpnameService.createSO(req.body);
      res.json(FormatterResponse.success(proses, "SO berhasil dibuat"));
    } catch (error) {
      next(error);
    }
  }
  async processSO(req: Request, res: Response, next: NextFunction) {
    try {
      const process = await this.stockOpnameService.processSO(req.body);
      res.json(FormatterResponse.success(process, "SO berhasil di proses"));
    } catch (error) {
      next(error);
    }
  }

  async processScheduleStatusOpname(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      res.json(
        FormatterResponse.success(
          await this.stockOpnameService.processScheduleStatusOpname(),
          "SO berhasil di proses"
        )
      );
    } catch (error) {
      next(error);
    }
  }
}

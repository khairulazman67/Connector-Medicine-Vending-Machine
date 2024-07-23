import { Request, Response, NextFunction } from "express";
import { autoInjectable, inject } from "tsyringe";
import { VMEtalaseService } from "../services/VMEtalaseService";
import { FormatterResponse } from "../utils/response/formatterResponse";

@autoInjectable()
export class VMEtalaseController {
  constructor(
    @inject(VMEtalaseService)
    private vmEtalaseService?: VMEtalaseService
  ) {}
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const machine = await this.vmEtalaseService?.createVMEtalase(req.body);
      res.json(
        FormatterResponse.success(machine, "Data vm etalase berhasil disimpan")
      );
    } catch (error) {
      next(error);
    }
  }
}

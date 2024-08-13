import { Request, Response, NextFunction } from "express";
import { autoInjectable, inject } from "tsyringe";
import { FormatterResponse } from "../utils/response/formatterResponse";
import { IVMEtalaseService } from "../services/VMEtalaseService/IVMEtalaseService";

@autoInjectable()
export class VMEtalaseController {
  constructor(
    @inject("IVMEtalaseService")
    private vmEtalaseService: IVMEtalaseService
  ) {}

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const machines = await this.vmEtalaseService?.getAllVMEtalase();
      res.json(FormatterResponse.success(machines, ""));
    } catch (error) {
      next(error);
    }
  }
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

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const etalase = await this.vmEtalaseService?.getVMEtalaseById(
        parseInt(id)
      );

      res.json(
        FormatterResponse.success(
          etalase,
          "Data vending machine etalase berhasil ditemukan"
        )
      );
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const machine = await this.vmEtalaseService?.updateVMEtalase(
        parseInt(id),
        req.body
      );
      res.json(
        FormatterResponse.success(
          machine,
          "Data vending machine etalase berhasil diupdate"
        )
      );
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await this.vmEtalaseService?.deleteVMEtalase(parseInt(id));

      res.json(
        FormatterResponse.success(
          parseInt,
          "Data vending machine etalase berhasil dihapus"
        )
      );
    } catch (error) {
      next(error);
    }
  }
}

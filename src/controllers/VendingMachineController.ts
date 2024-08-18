import { Request, Response, NextFunction } from "express";
import { autoInjectable, inject } from "tsyringe";
import { FormatterResponse } from "../utils/response/formatterResponse";
import { IVendingMachineService } from "../services/VendingMachineService/IVendingMachineService";

@autoInjectable()
export class VendingMachineController {
  constructor(
    @inject("IVendingMachineService")
    private vendingMachineService: IVendingMachineService
  ) {}

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const machines =
        await this.vendingMachineService?.getAllVendingMachines();
      res.json(
        FormatterResponse.success(
          machines,
          "Data vending machine berhasil disimpan"
        )
      );
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const machine = await this.vendingMachineService?.getVendingMachineById(
        parseInt(id)
      );

      res.json(
        FormatterResponse.success(
          machine,
          "Data vending machine berhasil ditemukan"
        )
      );
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const machine = await this.vendingMachineService?.createVendingMachine(
        req.body
      );
      res.json(
        FormatterResponse.success(
          machine,
          "Data vending machine berhasil disimpan"
        )
      );
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const machine = await this.vendingMachineService?.updateVendingMachine(
        parseInt(id),
        req.body
      );
      res.json(
        FormatterResponse.success(
          machine,
          "Data vending machine berhasil ditemukan"
        )
      );
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await this.vendingMachineService?.deleteVendingMachine(parseInt(id));
      res.json(
        FormatterResponse.success(null, "Data vending machine berhasil dihapus")
      );
    } catch (error) {
      next(error);
    }
  }
}

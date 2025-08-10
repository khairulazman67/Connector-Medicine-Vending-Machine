import { NextFunction, Request, Response } from "express";
import { autoInjectable, inject } from "tsyringe";
import { IFasyankesService } from "../services/fasyankesService/iFasyankes.service";
import { FormatterResponse } from "../utils/response/formatter.response";

@autoInjectable()
export class FasyankesController {
  constructor(
    @inject("IFasyankesService")
    private IFasyankesService: IFasyankesService
  ) {}

  async getFasyankesCode(req: Request, res: Response, next: NextFunction) {
    try {
      const { fasyankesCode } = req.params;
      const etalase = await this.IFasyankesService?.getFasyankesByFasyankesCode(
        fasyankesCode
      );

      res.json(
        FormatterResponse.success(etalase, "Data fasyankes berhasil ditemukan")
      );
    } catch (error) {
      next(error);
    }
  }
}

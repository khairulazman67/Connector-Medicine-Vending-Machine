import { Request, Response, NextFunction } from "express";
import { autoInjectable, inject } from "tsyringe";
import { FormatterResponse } from "../utils/response/formatterResponse";
import { TransactionService } from "../services/TransactionService";

@autoInjectable()
export class TransactionController {
  constructor(
    @inject(TransactionService)
    private TransactionService?: TransactionService
  ) {}

  async processTransactionVM(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await this.TransactionService?.processTransactionVM(
        req.body
      );

      res.json(
        FormatterResponse.success(response, "Transaksi berhasil di proses")
      );
    } catch (error) {
      next(error);
    }
  }
}

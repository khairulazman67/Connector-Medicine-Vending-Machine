import { NextFunction, Request, Response } from "express";
import { autoInjectable, inject } from "tsyringe";
import { ITransactionService } from "../services/transactionService/iTransaction.service";
import { FormatterResponse } from "../utils/response/formatter.response";

@autoInjectable()
export class TransactionController {
  constructor(
    @inject("ITransactionService")
    private transactionService: ITransactionService
  ) {}

  async processTransactionVM(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await this.transactionService?.processTransactionVM(
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

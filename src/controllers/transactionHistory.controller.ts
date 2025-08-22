import { NextFunction, Request, Response } from "express";
import { autoInjectable, inject } from "tsyringe";
import { ITransactionHistoryService } from "../services/transactionHistoryService/iTransactionHistory.service";
import { FormatterResponse } from "../utils/response/formatter.response";

@autoInjectable()
export class TransactionHistoryController {
  constructor(
    @inject("ITransactionHistoryService")
    private transactionHistoryService: ITransactionHistoryService
  ) {}

  async getListHistory(req: Request, res: Response, next: NextFunction) {
    try {
      const { vmId } = req.params;
      const response =
        await this.transactionHistoryService.getMyVmTransactionHistory(
          parseInt(vmId)
        );

      res.json(
        FormatterResponse.success(response, "Transaksi berhasil di proses")
      );
    } catch (error) {
      next(error);
    }
  }
}

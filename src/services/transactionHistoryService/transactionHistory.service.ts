import { TransactionHistory } from "@prisma/client";
import { inject, injectable } from "tsyringe";
import { prisma } from "../../db";
import { ITransactionHistoryRepository } from "../../repositories/transactionHistoryRepository/iTransactionHistory.repository";
import { ITransactionHistoryService } from "./iTransactionHistory.service";

@injectable()
export class TransactionHistoryService implements ITransactionHistoryService {
  constructor(
    @inject("ITransactionHistoryRepository")
    private transactionHistoryRepository: ITransactionHistoryRepository
  ) {}

  async getMyVmTransactionHistory(vmId: number): Promise<TransactionHistory[]> {
    try {
      return await prisma.$transaction(async (tx) => {
        return this.transactionHistoryRepository.getAllByVmId(vmId, tx);
      });
    } catch (error) {
      throw new Error(`There is an error ${error}`);
    }
  }
}

import { TransactionHistory } from "@prisma/client";

export interface ITransactionHistoryService {
  getMyVmTransactionHistory(vmId: number): Promise<TransactionHistory[]>;
}

import { processTransactionPayload } from "../../utils/validations/transaction.request";
export interface ITransactionService {
  processTransactionVM(data: processTransactionPayload): Promise<string>;
}

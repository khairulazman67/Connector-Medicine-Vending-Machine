import { processTransactionPayload } from "../../utils/validations/TransactionRequest";
export interface ITransactionService {
  processTransactionVM(data: processTransactionPayload): Promise<any>;
}

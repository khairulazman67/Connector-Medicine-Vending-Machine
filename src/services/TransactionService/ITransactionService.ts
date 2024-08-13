import { processTransactionPayload } from "../../utils/validations/transactionRequest";
export interface ITransactionService {
  processTransactionVM(data: processTransactionPayload): Promise<any>;
}

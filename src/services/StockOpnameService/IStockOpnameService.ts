import { processStockOpnamePayload } from "../../utils/validations/StockOpnameRequest";

export interface IStockOpnameService {
  createSO(data: processStockOpnamePayload): Promise<any>;
}

import {
  createStockOpnamePayload,
  processStockOpnamePayload,
} from "../../utils/validations/StockOpnameRequest";

export interface IStockOpnameService {
  createSO(data: createStockOpnamePayload): Promise<any>;
  processSO(data: processStockOpnamePayload): Promise<any | unknown>;
}

import { StockOpname } from "@prisma/client";
import {
  createStockOpnamePayload,
  processStockOpnamePayload,
} from "../../utils/validations/stockOpname.request";

export interface IStockOpnameService {
  createSO(data: createStockOpnamePayload): Promise<StockOpname | undefined>;
  processSO(
    data: processStockOpnamePayload,
    soCode: string
  ): Promise<any | unknown>;
  processScheduleStatusOpname(): Promise<StockOpname[]>;
}

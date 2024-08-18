import { StockOpname } from "@prisma/client";
import {
  createStockOpnamePayload,
  processStockOpnamePayload,
} from "../../utils/validations/StockOpnameRequest";

export interface IStockOpnameService {
  createSO(data: createStockOpnamePayload): Promise<StockOpname | undefined>;
  processSO(
    data: processStockOpnamePayload,
    soCode: string
  ): Promise<any | unknown>;
  processScheduleStatusOpname(): Promise<StockOpname[]>;
}

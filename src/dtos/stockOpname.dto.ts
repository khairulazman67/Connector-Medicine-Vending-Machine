import { Prisma } from "@prisma/client";
import { StockOpnameType } from "../types/stockOpnameType";
import { processStockOpnamePayload } from "../utils/validations/StockOpnameRequest";

export const stockOpnameDtoCreate = async (
  data: processStockOpnamePayload,
  otherData: {
    soCode: string;
  }
): Promise<Prisma.StockOpnameUncheckedCreateInput> => {
  return {
    soCode: otherData.soCode,
    vmId: data.vmId,
    note: data.note,
    soDateTime: data.soDateTime,
    details: {
      create: data.details,
    },
  };
};

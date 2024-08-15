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

// export const stockOpnameTransactionHistory = async (
//   data: processStockOpnamePayload
// ): Promise<Prisma.TransactionHistoryUncheckedCreateInput> => {
//   return {
//     vmId: data.vmId,
//     displayCode: data.vmId,
//     itemCode: data.vmId,
//     firstStock: data.vmId,
//     lastStock: data.vmId,
//     transactionType: $Enums.TransactionHistoryType,
//     status: $Enums.TransactionHistoryStatus,
//     note: string,
//   };
// };

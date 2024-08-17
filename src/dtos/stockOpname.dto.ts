import {
  Etalase,
  Prisma,
  StockOpnameStatus,
  TransactionHistoryStatus,
  TransactionHistoryType,
} from "@prisma/client";
import { processStockOpnamePayload } from "../utils/validations/StockOpnameRequest";

export const stockOpnameDtoCreate = async (
  data: processStockOpnamePayload,
  otherData: {
    soCode: string;
    status: StockOpnameStatus;
  }
): Promise<Prisma.StockOpnameUncheckedCreateInput> => {
  return {
    soCode: otherData.soCode,
    vmId: data.vmId,
    note: data.note,
    soDateTime: data.soDateTime,
    status: otherData.status,
    details: {
      create: data.details,
    },
  };
};

export const stockOpnameTransactionHistoryDto = async (
  data: processStockOpnamePayload,
  etalaseData: Required<Etalase>,
  otherData: {
    type: TransactionHistoryType;
    lastStock: number;
  }
): Promise<Prisma.TransactionHistoryUncheckedCreateInput> => {
  return {
    vmId: data.vmId,
    displayCode: etalaseData.displayCode,
    itemCode: etalaseData.itemCode,
    firstStock: etalaseData.stock,
    lastStock: otherData.lastStock,
    transactionType: otherData.type,
    status: TransactionHistoryStatus.STOCKOPNAME,
    note: `Stock opname obat pada VM ${data.vmId}`,
  };
};

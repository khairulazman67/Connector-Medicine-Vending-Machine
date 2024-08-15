import { inject, injectable } from "tsyringe";
import { processTransactionPayload } from "../../utils/validations/TransactionRequest";
import { prisma } from "../../db";
import {
  Prisma,
  TransactionHistoryType,
  Etalase,
  TransactionHistoryStatus,
} from "@prisma/client";
import axios from "axios";
import { baseAdapter } from "../../utils/adapter/axiosAdapter";
import { ITransactionService } from "./ITransactionService";
import { ITransactionHistoryRepository } from "../../repositories/TransactionHistoryRepository/ITransactionHistoryRepository";
import { IEtalaseRepository } from "../../repositories/EtalaseRepository/IEtalaseRepository";

@injectable()
export class TransactionService implements ITransactionService {
  constructor(
    @inject("ITransactionHistoryRepository")
    private TransactionHistoryRepository: ITransactionHistoryRepository,

    @inject("IEtalaseRepository")
    private EtalaseRepository: IEtalaseRepository
  ) {}

  async processTransactionVM(data: processTransactionPayload) {
    let payloadVM = "p1" + data.barcode;
    if (data.headerPrint) {
      payloadVM =
        payloadVM +
        "pd1_" +
        data.headerPrint.row1 +
        "pd2_" +
        data.headerPrint.row2 +
        "pd2_" +
        data.headerPrint.row2;
    }

    await prisma.$transaction(async (tx) => {
      for (const item of data.medicine) {
        const dataEtalase = await this.EtalaseRepository.getByItemVm(
          data.vmId,
          item.itemCode
        );

        if (!dataEtalase) {
          throw new Error(
            `Etalase vending machine ${data.vmId} dan kode obat ${item.itemCode} tidak ditemukan`
          );
        }

        const newStock = dataEtalase?.stock - item.amount;
        if (newStock <= 0)
          throw new Error(
            `Stok vending machine ${data.vmId} dan kode obat ${item.itemCode} tidak mencukupi`
          );

        const transactionSave: Prisma.TransactionHistoryUncheckedCreateInput = {
          vmId: data.vmId,
          displayCode: dataEtalase?.displayCode,
          itemCode: item.itemCode,
          firstStock: dataEtalase?.stock,
          lastStock: newStock,
          note: `Pengambilan obat pada VM ${data.vmId}`,
          status: TransactionHistoryStatus.TAKING,
          transactionType: TransactionHistoryType.DEBIT,
        };

        await this.TransactionHistoryRepository.create(transactionSave, tx);

        let etalaseSave: Partial<Etalase> = {
          stock: newStock,
        };

        await this.EtalaseRepository.update(dataEtalase.id, etalaseSave, tx);

        console.log("dataEtalase ", dataEtalase);
        payloadVM =
          payloadVM +
          "pn_" +
          dataEtalase.displayCode +
          dataEtalase.medicineName +
          " " +
          item.usageRules;
      }
    });

    // Buat instance Axios baru menggunakan base adapter
    const axiosInstance = axios.create({
      adapter: baseAdapter,
    });

    // axiosInstance
    //   .post("/data", payloadVM)
    //   .then((response) => {
    //     console.log("Data:", response.data);
    //   })
    //   .catch((error) => {
    //     console.error("Error:", error);
    //   });

    console.log("send data ", payloadVM);
  }
}

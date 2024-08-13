import { injectable } from "tsyringe";
import { processTransactionPayload } from "../../utils/validations/transactionRequest";
import { VMEtalaseRepository } from "../../repositories/VMEtalaseRepository/VMEtalaseRepository";
import { prisma } from "../../db";
import { VmTransactionHistoryRepository } from "../../repositories/VmTransactionHistoryRepository/VmTransactionHistoryRepository";
import { Prisma, TransactionHistoryStatus, VmEtalase } from "@prisma/client";
import axios from "axios";
import { baseAdapter } from "../../utils/adapter/axiosAdapter";
import { ITransactionService } from "./ITransactionService";

@injectable()
export class TransactionService implements ITransactionService {
  constructor(
    // @inject(VmTransactionHistoryRepository)
    // @inject(VMEtalaseRepository)
    private vmTransactionHistoryRepository: VmTransactionHistoryRepository,
    private vmEtalaseRepository: VMEtalaseRepository // private vmEtalaseRepository: VMEtalaseRepository
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
        const dataEtalase = await this.vmEtalaseRepository.getByItemVm(
          data.idVm,
          item.itemCode
        );

        if (!dataEtalase) {
          throw new Error(
            `Etalase vending machine ${data.idVm} dan kode obat ${item.itemCode} tidak ditemukan`
          );
        }

        const newStock = dataEtalase?.stock - item.amount;
        if (newStock <= 0)
          throw new Error(
            `Stok vending machine ${data.idVm} dan kode obat ${item.itemCode} tidak mencukupi`
          );

        const transactionSave: Prisma.VmTransactionHistoryUncheckedCreateInput =
          {
            idVm: data.idVm,
            displayCode: dataEtalase?.displayCode,
            itemCode: item.itemCode,
            locationCode: data.locationCode,
            firstStock: dataEtalase?.stock,
            lastStock: newStock,
            note: `Pengambilan obat pada VM ${data.idVm}`,
            status: TransactionHistoryStatus.DEBIT,
          };

        await this.vmTransactionHistoryRepository.create(transactionSave, tx);

        let etalaseSave: Partial<VmEtalase> = {
          stock: newStock,
        };

        await this.vmEtalaseRepository.update(dataEtalase.id, etalaseSave, tx);

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

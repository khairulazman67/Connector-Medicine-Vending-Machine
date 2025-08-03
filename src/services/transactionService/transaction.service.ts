import {
  Etalase,
  Prisma,
  TransactionHistoryStatus,
  TransactionHistoryType,
} from "@prisma/client";
import { inject, injectable } from "tsyringe";
import { prisma } from "../../db";
import { IVendingMachineIntegration } from "../../integrations/vendingMachine/iVendingMachine.integration";
import { IEtalaseRepository } from "../../repositories/etalaseRepository/iEtalase.repository";
import { ITransactionHistoryRepository } from "../../repositories/transactionHistoryRepository/iTransactionHistory.repository";
import {
  NotFoundError,
  UnprocessableError,
} from "../../utils/errors/dynamicCustom.error";
import { processTransactionPayload } from "../../utils/validations/transaction.request";
import { ITransactionService } from "./iTransaction.service";

@injectable()
export class TransactionService implements ITransactionService {
  constructor(
    @inject("ITransactionHistoryRepository")
    private transactionHistoryRepository: ITransactionHistoryRepository,
    @inject("IEtalaseRepository")
    private etalaseRepository: IEtalaseRepository,
    @inject("IVendingMachineIntegration")
    private vendingMachineIntegration: IVendingMachineIntegration
  ) {}

  async processTransactionVM(data: processTransactionPayload) {
    let payloadVM: string = "p1" + data.barcode;
    if (data.headerPrint) {
      payloadVM =
        payloadVM +
        " pd0_" +
        data.headerPrint.row1 +
        " pd1_" +
         data.headerPrint.row2 + 
        " pd2_" +
        data.headerPrint.row3 +
        " pd3_";
        data.headerPrint.row4;
    }

    await prisma.$transaction(async (tx) => {
      for (const item of data.medicine) {
        const dataEtalase = await this.etalaseRepository.getByItemVm(
          data.vmId,
          item.itemCode
        );

        if (!dataEtalase) {
          throw new NotFoundError(
            `Etalase vending machine ${data.vmId} dan kode obat ${item.itemCode}`
          );
        }

        const newStock = dataEtalase?.stock - item.amount;
        if (newStock <= 0)
          throw new UnprocessableError(
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

        await this.transactionHistoryRepository.create(transactionSave, tx);

        let etalaseSave: Partial<Etalase> = {
          stock: newStock,
        };

        await this.etalaseRepository.update(dataEtalase.id, etalaseSave, tx);

        console.log("dataEtalase ", dataEtalase);
<<<<<<< HEAD
        for (let i = 0; i < 0; i++) {
          payloadVM =
            payloadVM +
            " pn_" +
            dataEtalase.displayCode +
            dataEtalase.medicineName +
            " " +
            item.usageRules +
            " pz";
        }
=======


        for( let i =0; i<item.amount;i++){
          payloadVM =
          payloadVM +
          " pn_" +
          dataEtalase.displayCode +
          dataEtalase.medicineName +
          " " +
          item.usageRules+' pz'
        }
         
>>>>>>> f387dbb6863d48f4dd4641e8df4a1bd95a358767
      }
    });


     await this.vendingMachineIntegration.sendRequest(payloadVM);

    return payloadVM;
  }
}

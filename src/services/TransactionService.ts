import { injectable, inject } from "tsyringe";
import { VendingMachineRepository } from "../repositories/VendingMachineRepository";
import { processTransactionPayload } from "../utils/validations/transactionRequest";
import { VMEtalaseRepository } from "../repositories/VMEtalaseRepository";
import { prisma } from "../db";
import { VmTransactionHistoryRepository } from "../repositories/VmTransactionHistoryRepository";
import { Prisma, TransactionHistoryStatus, VmEtalase } from "@prisma/client";

@injectable()
export class TransactionService {
  constructor(
    @inject(VendingMachineRepository)
    private vendingMachineRepository: VendingMachineRepository,
    private vmEtalaseRepository: VMEtalaseRepository, // private vmEtalaseRepository: VMEtalaseRepository
    private vmTransactionHistoryRepository: VmTransactionHistoryRepository
  ) {}

  async processTransactionVM(data: processTransactionPayload) {
    await prisma.$transaction(async (tx) => {
      for (const item of data.medicine) {
        const dataEtalase = await this.vmEtalaseRepository.getByItemVm(
          data.idVm,
          item.itemCode
        );

        console.log("dataEtalase ", dataEtalase);

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
      }
    });
  }
}

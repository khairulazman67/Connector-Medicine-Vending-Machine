import { container } from "tsyringe";
import { TransactionService } from "./services/TransactionService/TransactionService";
import { ITransactionService } from "./services/TransactionService/ITransactionService";
import { IVendingMachineService } from "./services/VendingMachineService/IVendingMachineService";
import { VendingMachineService } from "./services/VendingMachineService/VendingMachineService";
import { IVMEtalaseService } from "./services/VMEtalaseService/IVMEtalaseService";
import { VMEtalaseService } from "./services/VMEtalaseService/VMEtalaseService";
import { IVMEtalaseRepository } from "./repositories/VMEtalaseRepository/IVMEtalaseRepository";
import { VMEtalaseRepository } from "./repositories/VMEtalaseRepository/VMEtalaseRepository";
import { IVmTransactionHistoryRepository } from "./repositories/VmTransactionHistoryRepository/IVmTransactionHistoryRepository";
import { VmTransactionHistoryRepository } from "./repositories/VmTransactionHistoryRepository/VmTransactionHistoryRepository";
import { IVendingMachineRepository } from "./repositories/VendingMachineRepository/IVendingMachineRepository";
import { VendingMachineRepository } from "./repositories/VendingMachineRepository/VendingMachineRepository";

container.registerSingleton<ITransactionService>(
  "ITransactionService",
  TransactionService
);

container.registerSingleton<IVendingMachineService>(
  "IVendingMachineService",
  VendingMachineService
);

container.registerSingleton<IVMEtalaseService>(
  "IVMEtalaseService",
  VMEtalaseService
);

container.registerSingleton<IVMEtalaseRepository>(
  "IVMEtalaseRepository",
  VMEtalaseRepository
);

container.registerSingleton<IVmTransactionHistoryRepository>(
  "IVmTransactionHistoryRepository",
  VmTransactionHistoryRepository
);

container.registerSingleton<IVendingMachineRepository>(
  "IVendingMachineRepository",
  VendingMachineRepository
);

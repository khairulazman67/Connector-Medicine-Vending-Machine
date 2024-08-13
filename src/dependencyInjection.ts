import { container } from "tsyringe";
import { TransactionService } from "./services/TransactionService/TransactionService";
import { ITransactionService } from "./services/TransactionService/ITransactionService";
import { IVendingMachineService } from "./services/VendingMachineService/IVendingMachineService";
import { VendingMachineService } from "./services/VendingMachineService/VendingMachineService";
import { IVMEtalaseService } from "./services/VMEtalaseService/IVMEtalaseService";
import { VMEtalaseService } from "./services/VMEtalaseService/VMEtalaseService";

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

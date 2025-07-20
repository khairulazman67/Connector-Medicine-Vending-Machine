import { container } from "tsyringe";
import { TransactionService } from "./services/transactionService/transaction.service";
import { ITransactionService } from "./services/transactionService/iTransaction.service";
import { IVendingMachineService } from "./services/vendingMachineService/iVendingMachine.service";
import { VendingMachineService } from "./services/vendingMachineService/vendingMachine.service";
import { IEtalaseService } from "./services/etalaseService/iEtalase.service";
import { EtalaseService } from "./services/etalaseService/etalase.service";
import { IEtalaseRepository } from "./repositories/etalaseRepository/iEtalase.repository";
import { EtalaseRepository } from "./repositories/etalaseRepository/etalase.repository";
import { ITransactionHistoryRepository } from "./repositories/transactionHistoryRepository/iTransactionHistory.repository";
import { TransactionHistoryRepository } from "./repositories/transactionHistoryRepository/transactionHistory.repository";
import { IVendingMachineRepository } from "./repositories/vendingMachineRepository/iVendingMachine.repository";
import { VendingMachineRepository } from "./repositories/vendingMachineRepository/vendingMachine.repository";
import { IStockOpnameService } from "./services/stockOpnameService/iStockOpname.service";
import { StockOpnameService } from "./services/stockOpnameService/stockOpname.service";
import { IStockOpnameRepository } from "./repositories/stockOpnameRepository/iStockOpname.repository";
import { StockOpnameRepository } from "./repositories/stockOpnameRepository/stockOpname.repository";
import { ILockingRepository } from "./repositories/lockingRepository/iLocking.repository";
import { LockingRepository } from "./repositories/lockingRepository/locking.repository";

container.registerSingleton<ITransactionService>(
  "ITransactionService",
  TransactionService
);

container.registerSingleton<IVendingMachineService>(
  "IVendingMachineService",
  VendingMachineService
);

container.registerSingleton<IEtalaseService>("IEtalaseService", EtalaseService);

container.registerSingleton<IStockOpnameService>(
  "IStockOpnameService",
  StockOpnameService
);

container.registerSingleton<IEtalaseRepository>(
  "IEtalaseRepository",
  EtalaseRepository
);

container.registerSingleton<ITransactionHistoryRepository>(
  "ITransactionHistoryRepository",
  TransactionHistoryRepository
);

container.registerSingleton<IVendingMachineRepository>(
  "IVendingMachineRepository",
  VendingMachineRepository
);

container.registerSingleton<IStockOpnameRepository>(
  "IStockOpnameRepository",
  StockOpnameRepository
);

container.registerSingleton<ILockingRepository>(
  "ILockingRepository",
  LockingRepository
);

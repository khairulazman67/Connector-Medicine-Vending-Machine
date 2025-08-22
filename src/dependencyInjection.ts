import { container } from "tsyringe";
import { IVendingMachineIntegration } from "./integrations/vendingMachine/iVendingMachine.integration";
import { VendingMachineIntegration } from "./integrations/vendingMachine/vendingMachine.integration";
import { EtalaseRepository } from "./repositories/etalaseRepository/etalase.repository";
import { IEtalaseRepository } from "./repositories/etalaseRepository/iEtalase.repository";
import { FasyankesRepository } from "./repositories/fasyankesRepository/fasyankes.repository";
import { IFasyankesRepository } from "./repositories/fasyankesRepository/iFasyankes.repository";
import { ILockingRepository } from "./repositories/lockingRepository/iLocking.repository";
import { LockingRepository } from "./repositories/lockingRepository/locking.repository";
import { IStockOpnameRepository } from "./repositories/stockOpnameRepository/iStockOpname.repository";
import { StockOpnameRepository } from "./repositories/stockOpnameRepository/stockOpname.repository";
import { ITransactionHistoryRepository } from "./repositories/transactionHistoryRepository/iTransactionHistory.repository";
import { TransactionHistoryRepository } from "./repositories/transactionHistoryRepository/transactionHistory.repository";
import { IVendingMachineRepository } from "./repositories/vendingMachineRepository/iVendingMachine.repository";
import { VendingMachineRepository } from "./repositories/vendingMachineRepository/vendingMachine.repository";
import { EtalaseService } from "./services/etalaseService/etalase.service";
import { IEtalaseService } from "./services/etalaseService/iEtalase.service";
import { FasyankesService } from "./services/fasyankesService/fasyankes.service";
import { IFasyankesService } from "./services/fasyankesService/iFasyankes.service";
import { IStockOpnameService } from "./services/stockOpnameService/iStockOpname.service";
import { StockOpnameService } from "./services/stockOpnameService/stockOpname.service";
import { ITransactionHistoryService } from "./services/transactionHistoryService/iTransactionHistory.service";
import { TransactionHistoryService } from "./services/transactionHistoryService/transactionHistory.service";
import { ITransactionService } from "./services/transactionService/iTransaction.service";
import { TransactionService } from "./services/transactionService/transaction.service";
import { IVendingMachineService } from "./services/vendingMachineService/iVendingMachine.service";
import { VendingMachineService } from "./services/vendingMachineService/vendingMachine.service";

// #region services
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
container.registerSingleton<IFasyankesService>(
  "IFasyankesService",
  FasyankesService
);

container.registerSingleton<ITransactionHistoryService>(
  "ITransactionHistoryService",
  TransactionHistoryService
);

// #endregion services

//  #region repositories
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
container.registerSingleton<IFasyankesRepository>(
  "IFasyankesRepository",
  FasyankesRepository
);
// #endregion repositories

// #region integrations
container.registerSingleton<IVendingMachineIntegration>(
  "IVendingMachineIntegration",
  VendingMachineIntegration
);
// #endregion integrations

import { container } from "tsyringe";
import { TransactionService } from "./services/TransactionService/TransactionService";
import { ITransactionService } from "./services/TransactionService/ITransactionService";
import { IVendingMachineService } from "./services/VendingMachineService/IVendingMachineService";
import { VendingMachineService } from "./services/VendingMachineService/VendingMachineService";
import { IEtalaseService } from "./services/EtalaseService/IEtalaseService";
import { EtalaseService } from "./services/EtalaseService/EtalaseService";
import { IEtalaseRepository } from "./repositories/EtalaseRepository/IEtalaseRepository";
import { EtalaseRepository } from "./repositories/EtalaseRepository/EtalaseRepository";
import { ITransactionHistoryRepository } from "./repositories/TransactionHistoryRepository/ITransactionHistoryRepository";
import { TransactionHistoryRepository } from "./repositories/TransactionHistoryRepository/TransactionHistoryRepository";
import { IVendingMachineRepository } from "./repositories/VendingMachineRepository/IVendingMachineRepository";
import { VendingMachineRepository } from "./repositories/VendingMachineRepository/VendingMachineRepository";
import { IStockOpnameService } from "./services/StockOpnameService/IStockOpnameService";
import { StockOpnameService } from "./services/StockOpnameService/StockOpnameService";
import { IStockOpnameRepository } from "./repositories/StockOpnameRepository/IStockOpnameRepository";
import { StockOpnameRepository } from "./repositories/StockOpnameRepository/StockOpnameRepository";
import { ILockingRepository } from "./repositories/LockingRepository/ILockingRepository";
import { LockingRepository } from "./repositories/LockingRepository/LockingRepository";

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

import "reflect-metadata";
import express from "express";
import { container } from "tsyringe";
import VendingMachineRoute from "./routes/VendingMachineRoute";
import VMEtalaseRoute from "./routes/VMEtalaseRoute";
import TransactionRoute from "./routes/TransactionRoute";
import { globalErrorHandler } from "./middleware/errorHandler";
import { VendingMachineService } from "./services/VendingMachineService/VendingMachineService";
import { VendingMachineRepository } from "./repositories/VendingMachineRepository/VendingMachineRepository";
import { VMEtalaseRepository } from "./repositories/VMEtalaseRepository/VMEtalaseRepository";
import { VMEtalaseService } from "./services/VMEtalaseService/VMEtalaseService";
import { TransactionService } from "./services/TransactionService/TransactionService";
import { ITransactionService } from "./services/TransactionService/ITransactionService";
import { IVendingMachineRepository } from "./repositories/VendingMachineRepository/IVendingMachineRepository";
const app = express();
const port = process.env.PORT;

// Middleware
app.use(express.json());

// Register services and repositories
container.registerSingleton<ITransactionService>(TransactionService);
container.registerSingleton<IVendingMachineRepository>(
  VendingMachineRepository
);
container.registerSingleton(VendingMachineService);
container.registerSingleton(VMEtalaseRepository);
container.registerSingleton(VMEtalaseService);

// Routes
app.use("/v1/vm", VendingMachineRoute);
app.use("/v1/vm-etalase", VMEtalaseRoute);
app.use("/v1/vm-transaction", TransactionRoute);

// Error handling middleware
app.use(globalErrorHandler);

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

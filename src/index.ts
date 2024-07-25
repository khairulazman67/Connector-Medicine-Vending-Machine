import "reflect-metadata";
import express from "express";
import { container } from "tsyringe";
import VendingMachineRoute from "./routes/VendingMachineRoute";
import VMEtalaseRoute from "./routes/VMEtalaseRoute";
import { globalErrorHandler } from "./middleware/errorHandler";
import { VendingMachineService } from "./services/VendingMachineService";
import { VendingMachineRepository } from "./repositories/VendingMachineRepository";
import { VMEtalaseRepository } from "./repositories/VMEtalaseRepository";
import { VMEtalaseService } from "./services/VMEtalaseService";
const app = express();
const port = process.env.PORT;

// Middleware
app.use(express.json());

// Register services and repositories
container.registerSingleton(VendingMachineRepository);
container.registerSingleton(VendingMachineService);

container.registerSingleton(VMEtalaseRepository);
container.registerSingleton(VMEtalaseService);

// Routes
app.use("/v1/vm", VendingMachineRoute);
app.use("/v1/vm-etalase", VMEtalaseRoute);

// Error handling middleware
app.use(globalErrorHandler);

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

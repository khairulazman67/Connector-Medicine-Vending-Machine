import "reflect-metadata";
import express from "express";
import { container } from "tsyringe";
import VendingMachineRoutes from "./routes/VendingMachineRoute";
import { globalErrorHandler } from "./middleware/errorHandler";
import { VendingMachineService } from "./services/VendingMachineService";
import { VendingMachineRepository } from "./repositories/VendingMachineRepository";
const app = express();
const port = process.env.PORT;

// Middleware
app.use(express.json());

// Register services and repositories
container.registerSingleton(VendingMachineRepository);
container.registerSingleton(VendingMachineService);

// Routes
app.use("/v1/vm", VendingMachineRoutes);

// Error handling middleware
app.use(globalErrorHandler);

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

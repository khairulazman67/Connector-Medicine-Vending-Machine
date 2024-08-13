import "reflect-metadata";
import express from "express";
import "./dependencyInjection";
import VendingMachineRoute from "./routes/VendingMachineRoute";
import EtalaseRoute from "./routes/EtalaseRoute";
import TransactionRoute from "./routes/TransactionRoute";
import { globalErrorHandler } from "./middleware/errorHandler";

const app = express();
const port = process.env.PORT;

// Middleware
app.use(express.json());

// Routes
app.use("/v1/vm", VendingMachineRoute);
app.use("/v1/etalase", EtalaseRoute);
app.use("/v1/transaction", TransactionRoute);

// Error handling middleware
app.use(globalErrorHandler);

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

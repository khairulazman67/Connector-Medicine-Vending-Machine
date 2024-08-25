import "reflect-metadata";
import express from "express";
import "./dependencyInjection";
import VendingMachineRoute from "./routes/VendingMachineRoute";
import EtalaseRoute from "./routes/EtalaseRoute";
import TransactionRoute from "./routes/TransactionRoute";
import StockOpnameRoute from "./routes/StockOpnameRoute";
import { BadRouteError } from "./utils/errors/DynamicCustomError";
import { errorHandler } from "./middleware/errorHandler";
import { container } from "tsyringe";
import { StockOpnameScheduler } from "./jobs/stockOpnameScheduler";
import { logger } from "./logs/pino";
import { pinoHttp } from "pino-http";

const app = express();
const port = process.env.PORT;

// Middleware
app.use(express.json());

// Routes
if (process.env.HTTP_LOG_ENABLED === "true") {
  app.use(pinoHttp({ logger }));
}

app.use("/v1/vm", VendingMachineRoute);
app.use("/v1/etalase", EtalaseRoute);
app.use("/v1/transaction", TransactionRoute);
app.use("/v1/stock-opname", StockOpnameRoute);

app.all("/*", () => {
  throw new BadRouteError();
});

// Error handling middleware
app.use(errorHandler);

// Stock Opname Job Scheduler
if (process.env.STOCK_OPNAME_JOB_ENABLED === "true") {
  const StockOpnameSchedulerImpl = container.resolve(StockOpnameScheduler);
  StockOpnameSchedulerImpl.start;
}
// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

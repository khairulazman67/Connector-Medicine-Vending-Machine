import "reflect-metadata";
import express from "express";
import "./dependencyInjection";
import VendingMachineRoute from "./routes/vendingMachine.route";
import EtalaseRoute from "./routes/etalase.route";
import TransactionRoute from "./routes/transaction.route";
import StockOpnameRoute from "./routes/stockOpname.route";
import { BadRouteError } from "./utils/errors/dynamicCustom.error";
import { errorHandler } from "./middlewares/errorHandler.middleware";
import { container } from "tsyringe";
import { StockOpnameScheduler } from "./jobs/stockOpname.scheduler";
import { logger } from "./logs/pino";
import { pinoHttp } from "pino-http";

const app = express();
const port = process.env.PORT ?? 3000;

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

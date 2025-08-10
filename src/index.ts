import express from "express";
import { pinoHttp } from "pino-http";
import "reflect-metadata";
import { container } from "tsyringe";
import "./dependencyInjection";
import { StockOpnameScheduler } from "./jobs/stockOpname.scheduler";
import { logger } from "./logs/pino";
import { errorHandler } from "./middlewares/errorHandler.middleware";
import EtalaseRoute from "./routes/etalase.route";
import FasyankesRoute from "./routes/fasyankes.route";
import StockOpnameRoute from "./routes/stockOpname.route";
import TransactionRoute from "./routes/transaction.route";
import VendingMachineRoute from "./routes/vendingMachine.route";
import { BadRouteError } from "./utils/errors/dynamicCustom.error";

const app = express();
const port = process.env.PORT ?? 3000;

// Middleware
app.use(express.json());

// Routes
if (process.env.HTTP_LOG_ENABLED === "true") {
  app.use(pinoHttp({ logger }));
}

app.use(`/vm`, VendingMachineRoute);
app.use(`/etalase`, EtalaseRoute);
app.use(`/transaction`, TransactionRoute);
app.use(`/stock-opname`, StockOpnameRoute);
app.use(`/fasyankes`, FasyankesRoute);

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

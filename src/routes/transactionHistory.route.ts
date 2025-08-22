import { Router } from "express";
import { container } from "tsyringe";
import { TransactionHistoryController } from "../controllers/transactionHistory.controller";

const router = Router();
const transactionHistoryController = container.resolve(
  TransactionHistoryController
);

router.get(
  "/:vmId",
  transactionHistoryController.getListHistory.bind(transactionHistoryController)
);

export default router;

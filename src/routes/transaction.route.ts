import { Router } from "express";
import { container } from "tsyringe";
import validate from "../middlewares/payloadValidation.middleware";
import { processTransactionSchema } from "../utils/validations/transaction.request";
import { checkTransactionStatus } from "../middlewares/checkTransactionStatus.middleware";
import { TransactionController } from "../controllers/transaction.controller";

const router = Router();
const transactionController = container.resolve(TransactionController);

router.post(
  "/",
  validate(processTransactionSchema),
  checkTransactionStatus,
  transactionController.processTransactionVM.bind(transactionController)
);

export default router;

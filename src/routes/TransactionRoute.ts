import { Router } from "express";
import { container } from "tsyringe";
import { TransactionController } from "../controllers/TransactionController";
import validate from "../middleware/payloadValidation";
import { processTransactionSchema } from "../utils/validations/TransactionRequest";
import { checkTransactionStatus } from "../middleware/checkTransactionStatus";

const router = Router();
const transactionController = container.resolve(TransactionController);

router.post(
  "/",
  validate(processTransactionSchema),
  checkTransactionStatus,
  transactionController.processTransactionVM.bind(transactionController)
);

export default router;

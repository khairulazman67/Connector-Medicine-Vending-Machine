import { Router } from "express";
import { StockOpnameController } from "../controllers/StockOpnameController";
import { container } from "tsyringe";
import { processStockOpnameSchema } from "../utils/validations/StockOpnameRequest";
import validate from "../middleware/payloadValidation";

const router = Router();
const stockOpnameController = container.resolve(StockOpnameController);

router.post(
  "/",
  validate(processStockOpnameSchema),
  stockOpnameController.processSo.bind(stockOpnameController)
);

export default router;

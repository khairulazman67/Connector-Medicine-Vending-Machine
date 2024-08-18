import { Router } from "express";
import { StockOpnameController } from "../controllers/StockOpnameController";
import { container } from "tsyringe";
import {
  createStockOpnameSchema,
  processStockOpnameSchema,
} from "../utils/validations/StockOpnameRequest";
import validate from "../middleware/payloadValidation";

const router = Router();
const stockOpnameController = container.resolve(StockOpnameController);
router.post(
  "/",
  validate(createStockOpnameSchema),
  stockOpnameController.createSO.bind(stockOpnameController)
);

router.post(
  "/process/:soCode",
  validate(processStockOpnameSchema),
  stockOpnameController.processSO.bind(stockOpnameController)
);

router.put(
  "/process-schedule-status",
  stockOpnameController.processScheduleStatusOpname.bind(stockOpnameController)
);

export default router;

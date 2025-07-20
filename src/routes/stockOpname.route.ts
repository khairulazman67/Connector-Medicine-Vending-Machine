import { Router } from "express";
import { container } from "tsyringe";
import {
  createStockOpnameSchema,
  processStockOpnameSchema,
} from "../utils/validations/stockOpname.request";
import validate from "../middlewares/payloadValidation.middleware";
import { StockOpnameController } from "../controllers/stockOpname.controller";

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

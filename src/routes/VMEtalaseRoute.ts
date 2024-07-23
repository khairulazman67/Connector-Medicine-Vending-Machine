import { Router } from "express";
import { container } from "tsyringe";
import { VendingMachineController } from "../controllers/VendingMachineController";
import validate from "../middleware/payloadValidation";
import { vendingMachineSchema } from "../utils/validations/vendingMachineRequest";

const router = Router();
const vendingMachineController = container.resolve(VendingMachineController);

router.post(
  "/",
  validate(vendingMachineSchema),
  vendingMachineController.create.bind(vendingMachineController)
);

export default router;

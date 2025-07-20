import { Router } from "express";
import { container } from "tsyringe";
import validate from "../middlewares/payloadValidation.middleware";
import { vendingMachineSchema } from "../utils/validations/vendingMachine.request";
import { VendingMachineController } from "../controllers/vendingMachine.controller";

const router = Router();
const vendingMachineController = container.resolve(VendingMachineController);

router.get("/", vendingMachineController.getAll.bind(vendingMachineController));
router.get(
  "/:id",
  vendingMachineController.getById.bind(vendingMachineController)
);
router.post(
  "/",
  validate(vendingMachineSchema),
  vendingMachineController.create.bind(vendingMachineController)
);
router.put(
  "/:id",
  validate(vendingMachineSchema),
  vendingMachineController.update.bind(vendingMachineController)
);
router.delete(
  "/:id",
  vendingMachineController.delete.bind(vendingMachineController)
);

export default router;

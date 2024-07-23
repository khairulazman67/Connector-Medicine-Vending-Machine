import { Router } from "express";
import { container } from "tsyringe";
import { VendingMachineController } from "../controllers/VendingMachineController";
import validate from "../middleware/payloadValidation";
import { vendingMachineSchema } from "../utils/validations/vendingMachineRequest";

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

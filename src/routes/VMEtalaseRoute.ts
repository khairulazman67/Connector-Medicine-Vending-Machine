import { Router } from "express";
import { container } from "tsyringe";
import { VendingMachineController } from "../controllers/VendingMachineController";
import validate from "../middleware/payloadValidation";
import {
  vmEtalaseCreateSchema,
  vmEtalaseUpdateSchema,
} from "../utils/validations/vmEtalaseRequest";
import { VMEtalaseController } from "../controllers/VMEtalaseController";

const router = Router();
const vmEtalaseController = container.resolve(VMEtalaseController);

router.post(
  "/",
  validate(vmEtalaseCreateSchema),
  vmEtalaseController.create.bind(vmEtalaseController)
);
router.get("/", vmEtalaseController.getAll.bind(vmEtalaseController));
router.get("/:id", vmEtalaseController.getById.bind(vmEtalaseController));
router.put(
  "/:id",
  validate(vmEtalaseUpdateSchema),
  vmEtalaseController.update.bind(vmEtalaseController)
);
router.delete("/:id", vmEtalaseController.delete.bind(vmEtalaseController));

export default router;

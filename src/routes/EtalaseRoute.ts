import { Router } from "express";
import { container } from "tsyringe";
import { VendingMachineController } from "../controllers/VendingMachineController";
import validate from "../middleware/payloadValidation";
import {
  EtalaseCreateSchema,
  EtalaseUpdateSchema,
} from "../utils/validations/EtalaseRequest";
import { EtalaseController } from "../controllers/EtalaseController";

const router = Router();
const etalaseController = container.resolve(EtalaseController);

router.post(
  "/",
  validate(EtalaseCreateSchema),
  etalaseController.create.bind(etalaseController)
);
router.get("/", etalaseController.getAll.bind(etalaseController));
router.get("/:id", etalaseController.getById.bind(etalaseController));
router.put(
  "/:id",
  validate(EtalaseUpdateSchema),
  etalaseController.update.bind(etalaseController)
);
router.delete("/:id", etalaseController.delete.bind(etalaseController));

export default router;

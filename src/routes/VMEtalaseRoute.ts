import { Router } from "express";
import { container } from "tsyringe";
import { VendingMachineController } from "../controllers/VendingMachineController";
import validate from "../middleware/payloadValidation";
import { vmEtalaseCreateSchema } from "../utils/validations/vmEtalaseRequest";
import { VMEtalaseController } from "../controllers/VMEtalaseController";

const router = Router();
const vMEtalaseController = container.resolve(VMEtalaseController);

router.post(
  "/",
  validate(vmEtalaseCreateSchema),
  vMEtalaseController.create.bind(vMEtalaseController)
);

export default router;

import { Router } from "express";
import { container } from "tsyringe";
import { VendingMachineController } from "../controllers/VendingMachineController";
import express, { Request, Response, NextFunction } from "express";
import { z, AnyZodObject } from "zod";
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
  vendingMachineController.update.bind(vendingMachineController)
);
router.delete(
  "/:id",
  vendingMachineController.delete.bind(vendingMachineController)
);

export default router;

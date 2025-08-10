import { Router } from "express";
import { container } from "tsyringe";
import { FasyankesController } from "../controllers/fasyankes.controller";

const router = Router();
const fasyankesController = container.resolve(FasyankesController);

router.get(
  "/:fasyankesCode",
  fasyankesController.getFasyankesCode.bind(fasyankesController)
);

export default router;

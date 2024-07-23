import { NextFunction, Request, Response } from "express";
import { prisma } from "../db";
import { insertVendingMachine } from "../repositories";

import { vendingMachineInsertSchema } from "../utils/validations";
import { invalidPayloadResp } from "../utils/response";
import {
  updateVendingMachine,
  getAllVendingMachine,
  getUniqueVendingMachine,
  destroyVendingMachine,
} from "../repositories/vendingMachine.repositor";

import { processInsertVM } from "../services/VendingMachine/IVendingMachineService";

export const getVendingMachine = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await getUniqueVendingMachine(parseInt(req.params.id));
    res.send(data);
  } catch (error) {
    next(error);
  }
};

export const getVendingMachines = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await getAllVendingMachine();
    res.send(data);
  } catch (error) {
    next(error);
  }
};

export const storeVM = async (req: Request, res: Response) => {
  const validationResult = vendingMachineInsertSchema.safeParse({
    ...req.body,
  });

  if (!validationResult.success) {
    return invalidPayloadResp(res, validationResult.error);
  }
  const saveData = await processInsertVM({
    ...req.body,
  });

  res.send(saveData);
};

export const updateVM = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const validationResult = vendingMachineInsertSchema.safeParse({
      ...req.body,
    });

    if (!validationResult.success) {
      return invalidPayloadResp(res, validationResult.error);
    }

    const saveData = await updateVendingMachine(
      parseInt(req.params.id),
      req.body
    );
    res.send(saveData);
  } catch (error) {
    next(error);
  }
};

export const deleteVM = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const saveData = await destroyVendingMachine(parseInt(req.params.id));
    res.send(saveData);
  } catch (error) {
    next(error);
  }
};

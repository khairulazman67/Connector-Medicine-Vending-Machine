import { Request, Response, NextFunction } from "express";
import { prisma } from "../db";
import { ForbiddenError } from "../utils/errors/dynamicCustom.error";
import { CustomError } from "../utils/errors/custom.error";

export const checkTransactionStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const Locking = await prisma.locking.findFirst({
      where: { vmId: req.body.vmId },
    });

    if (Locking) {
      if (Locking) throw new ForbiddenError(Locking.message);
    }
    next();
  } catch (error) {
    // if (error instanceof CustomError) {
    //   return next(error);
    // }
    next(error);
  }
};

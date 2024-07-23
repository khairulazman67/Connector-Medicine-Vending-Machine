import { Request, Response, NextFunction } from "express";
import { FormatterResponse } from "../utils/response/formatterResponse";

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500;
  const status = statusCode >= 400 && statusCode < 500 ? "fail" : "error";

  res
    .status(statusCode)
    .json(
      FormatterResponse.error(
        err.message,
        statusCode,
        process.env.NODE_ENV === "development" ? err.stack : undefined
      )
    );
};

import { Request, Response, NextFunction } from "express";
import { CustomError } from "../utils/errors/CustomError";
import { FormatterResponse } from "../utils/response/formatterResponse";
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("Error instance:", err instanceof CustomError);
  console.log("Handling error:", err);

  if (err instanceof CustomError) {
    return res.status(err.statusCode).send(err.formatErrors());
  }

  return res
    .status(400)
    .send(
      FormatterResponse.error(
        "Something went wrong",
        400,
        process.env.NODE_ENV === "development" ? err.stack : undefined
      )
    );
};

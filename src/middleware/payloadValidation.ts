import { Request, Response, NextFunction } from "express";
import { z, ZodError } from "zod";
import { FormatterResponse } from "../utils/response/formatterResponse";

// Middleware untuk validasi
function validate(schema: z.ZodSchema<any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    const validationResult = schema.safeParse(req.body);

    if (!validationResult.success) {
      return FormatterResponse.invalidPayloadResp(res, validationResult.error);
    }

    req.body = validationResult.data; // Mengupdate req.body dengan data yang tervalidasi
    next();
  };
}

export default validate;

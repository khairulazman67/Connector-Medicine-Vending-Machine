import type { Response } from "express";
import type { ZodError } from "zod";
import { formatZodError } from "./validationResponse";

export class FormatterResponse {
  static success<T>(data: T, message: string = "Operation successful") {
    return {
      status: "success",
      code: 200,
      message,
      data,
    };
  }

  static error(message: string, code: number = 500, stack?: string) {
    return {
      code,
      status: "error",
      message,
      ...(stack && { stack }),
    };
  }

  static invalidPayloadResp(r: Response, err: ZodError, status: number = 402) {
    r.status(status).json({
      code: status,
      status: "error",
      message: "form validation error",
      error: formatZodError(err),
    });
  }
}

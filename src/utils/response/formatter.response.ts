import { ZodError } from "zod";

interface errorMessages {
  [key: string]: string;
}
export class FormatterResponse {
  static success<T>(data?: T, message: string = "Successful") {
    return {
      isSuccess: true,
      code: 200,
      message,
      ...(data && { data }),
    };
  }

  static error(
    message: string = "Something went wrong",
    code: number = 400,
    stack?: string,
    data?: any
  ) {
    message = message + ".";
    return {
      isSuccess: false,
      code,
      message,
      data,
      ...(stack && { stack }),
    };
  }
}

export const formatZodError = (err: ZodError) => {
  const { fieldErrors } = err.flatten();
  const errors: errorMessages = {};

  for (let key of Object.keys(fieldErrors)) {
    const errorMsg = fieldErrors[key];
    if (errorMsg != undefined) {
      errors[key] = errorMsg[0];
    }
  }

  return errors;
};

import { FormatterResponse } from "../response/formatter.response";
import { formatZodError } from "../response/formatter.response";
import { CustomError } from "./custom.error";

export class DynamicCustomError extends CustomError {
  statusCode = 404;
  data = undefined;
  constructor(message: string = "Not found", statusCode = 404, data?: any) {
    super();
    this.message = message;
    this.data = data;
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, DynamicCustomError.prototype);
  }

  formatErrors() {
    return FormatterResponse.error(
      this.message,
      this.statusCode,
      process.env.NODE_ENV === "development" ? this.stackTrace : undefined,
      this.data
    );
  }
}

export class BadRouteError extends DynamicCustomError {
  constructor(
    message: string = "This route does not exist",
    statusCode: number = 404
  ) {
    super(message, statusCode);
  }
}

export class NotFoundError extends DynamicCustomError {
  constructor(message: string = "") {
    super(message, 404);
  }
}

export class UnprocessableError extends DynamicCustomError {
  constructor(message: string = "", data?: any) {
    super(message, 422, data);
  }
}

export class InvalidPayloadError extends DynamicCustomError {
  constructor(message: string = "", data?: any) {
    super(message, 422, formatZodError(data));
  }
}

export class ForbiddenError extends DynamicCustomError {
  constructor(message: string = "") {
    super(message, 403);
  }
}

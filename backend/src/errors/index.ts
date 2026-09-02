export class AppError extends Error {
  readonly statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);

    this.statusCode = statusCode;
    this.name = this.constructor.name;

    Error.captureStackTrace(this, this.constructor);
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = "Not found") {
    super(404, message);
  }
}

export class BadRequestError extends AppError {
  constructor(message: string = "Bad request") {
    super(400, message);
  }
}
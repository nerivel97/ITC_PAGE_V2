import { HttpStatusCode } from '../constants/http-status-codes';

export class HttpError extends Error {
  statusCode: HttpStatusCode;
  message: string;
  details?: string;

  constructor(statusCode: HttpStatusCode, message: string, details?: string) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.details = details;
  }
}

export class BadRequestError extends HttpError {
  constructor(message: string, details?: string) {
    super(HttpStatusCode.BAD_REQUEST, message, details);
  }
}

export class UnauthorizedError extends HttpError {
  constructor(message: string, details?: string) {
    super(HttpStatusCode.UNAUTHORIZED, message, details);
  }
}

export class ForbiddenError extends HttpError {
  constructor(message: string, details?: string) {
    super(HttpStatusCode.FORBIDDEN, message, details);
  }
}

export class NotFoundError extends HttpError {
  constructor(message: string, details?: string) {
    super(HttpStatusCode.NOT_FOUND, message, details);
  }
}

export class ConflictError extends HttpError {
  constructor(message: string, details?: string) {
    super(HttpStatusCode.CONFLICT, message, details);
  }
}

export class InternalServerError extends HttpError {
  constructor(message: string, details?: string) {
    super(HttpStatusCode.INTERNAL_SERVER_ERROR, message, details);
  }
}

export class NotImplementedError extends HttpError {
  constructor(message: string, details?: string) {
    super(HttpStatusCode.NOT_IMPLEMENTED, message, details);
  }
}

export class BadGatewayError extends HttpError {
  constructor(message: string, details?: string) {
    super(HttpStatusCode.BAD_GATEWAY, message, details);
  }
}

import type { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import { HttpStatusCode } from '../constants/http-status-codes';
import { HttpError } from '../utils/http-errors';

export const errorHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof z.ZodError) {
    res.status(HttpStatusCode.BAD_REQUEST).json({
      status: 'error',
      message: 'Error validando los datos de entrada',
      errors: err.issues,
    });
  } else if (err instanceof HttpError) {
    res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  } else if (err instanceof Error) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      status: 'error',
      message: err.message,
    });
  } else {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      status: 'error',
      message: 'Error interno del servidor',
    });
  }
};

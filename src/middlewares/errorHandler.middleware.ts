import getStructuredZodError from '@/utils/zod.error';
import type { ErrorRequestHandler, NextFunction } from 'express';
import { ZodError } from 'zod';

const errorHandlerMiddleware: ErrorRequestHandler = async (
  err,
  req,
  res,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  const status = err?.status ?? 500;
  const message = err?.message ?? `Something went wrong`;

  if (err instanceof ZodError) {
    const structErr = getStructuredZodError(err);
    return res.status(400).json(structErr);
  }

  res.status(status).json({ message });
};

export default errorHandlerMiddleware;

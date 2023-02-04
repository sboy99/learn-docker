import type { NextFunction, Request, RequestHandler, Response } from 'express';
import type { AnyZodObject } from 'zod';

export default function validate(schema: AnyZodObject): RequestHandler {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const data = await schema.parseAsync(req.body);
    req.body = data;
    return next();
  };
}

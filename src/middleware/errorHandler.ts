import { Request, Response, NextFunction } from "express";
import { HttpStatusCodes, messages } from "@utils/messages";

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(err);

  const statusCode = err.statusCode || HttpStatusCodes.INTERNAL_SERVER_ERROR;

  res.status(statusCode).json({
    status: "error",
    message: err.message || messages.unknownError,
  });
}

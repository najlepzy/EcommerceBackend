import { Request, Response, NextFunction } from "express";
import { HttpStatusCodes, messages } from "@utils/messages";

export const validateMockData = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { users, pets } = req.body;
  if (typeof users !== "number" || typeof pets !== "number") {
    res
      .status(HttpStatusCodes.BAD_REQUEST)
      .json({ message: messages.invalidProductsFormat });
    return;
  }
  next();
};

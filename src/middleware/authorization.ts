import { Request, Response, NextFunction } from "express";
import { HttpStatusCodes, messages } from "@utils/messages";

export const authorizeRoles = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as { role: string };

    !user
      ? res
          .status(HttpStatusCodes.UNAUTHORIZED)
          .json({ message: messages.noUserAuthenticated })
      : !roles.includes(user.role)
      ? res
          .status(HttpStatusCodes.FORBIDDEN)
          .json({ message: messages.accessDenied })
      : next();
  };
};

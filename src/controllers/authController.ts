import { Request, Response } from "express";
import User from "@models/userModel";
import * as userService from "@services/authService";
import { HttpStatusCodes, messages } from "@utils/messages";

export const registerUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const message = await userService.registerUser(req.body);
    res.status(HttpStatusCodes.CREATED).send(message);
  } catch (error: unknown) {
    res
      .status(
        error instanceof Error
          ? HttpStatusCodes.BAD_REQUEST
          : HttpStatusCodes.INTERNAL_SERVER_ERROR
      )
      .send(error instanceof Error ? error.message : messages.unknownError);
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  try {
    const user = await userService.loginUser(email, password);
    const token = userService.generateToken(user);
    res.cookie("jwt", token, { httpOnly: true, secure: false });
    res.json({ message: messages.loginSuccess });
  } catch (error: unknown) {
    res
      .status(HttpStatusCodes.UNAUTHORIZED)
      .send(
        error instanceof Error ? error.message : messages.authenticationFailed
      );
  }
};

export const getCurrentUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user = req.user as InstanceType<typeof User>;
    if (!user) {
      res
        .status(HttpStatusCodes.UNAUTHORIZED)
        .send(messages.noUserAuthenticated);
      return;
    }
    const userData = userService.getUserData(user);
    res.json(userData);
  } catch (error) {
    res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
      .send(messages.userDataFetchError);
  }
};

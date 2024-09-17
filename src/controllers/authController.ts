import { Request, Response } from "express";
import * as userService from "../services/authService";
import User from "../models/userModel";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const message = await userService.registerUser(req.body);
    res.status(201).send(message);
  } catch (error: unknown) {
    res
      .status(error instanceof Error ? 400 : 500)
      .send(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
  }
};

export const loginUser = (req: Request, res: Response) => {
  const user = req.user as InstanceType<typeof User> | undefined;
  return !user
    ? res.status(401).send("Authentication failed")
    : (res.cookie("jwt", userService.generateToken(user), {
        httpOnly: true,
        secure: false,
      }),
      res.json({ message: "Logged in successfully" }));
};

export const getCurrentUser = async (req: Request, res: Response) => {
  const user = req.user as InstanceType<typeof User>;
  return !user
    ? res.status(401).send("No user authenticated")
    : res.json(userService.getUserData(user));
};

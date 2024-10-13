import { userRepository } from "../repositories/userRepository";
import { UserDto } from "../dto/userDto";
import { env } from "../config/dotenv";
import jwt from "jsonwebtoken";
import { HttpStatusCodes, messages } from "../utils/messages";

class HttpError extends Error {
  statusCode: number;
  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const registerUser = async (userData: UserDto) => {
  try {
    const existingUser = await userRepository.findUserByEmail(userData.email);
    if (existingUser) {
      throw new HttpError(
        HttpStatusCodes.BAD_REQUEST,
        messages.userAlreadyRegistered
      );
    }
    await userRepository.registerUser(userData);
    return messages.userRegistered;
  } catch (err) {
    throw err;
  }
};

export const generateToken = (user: any) => {
  if (!env.JWT_SECRET) {
    throw new HttpError(HttpStatusCodes.BAD_REQUEST, messages.jwtSecretMissing);
  }
  const token = jwt.sign({ id: user._id }, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRATION,
  });
  return token;
};

export const loginUser = async (email: string, password: string) => {
  const user = await userRepository.findUserByEmail(email);
  if (!user || !(await user.comparePassword(password))) {
    throw new HttpError(
      HttpStatusCodes.UNAUTHORIZED,
      messages.invalidEmailOrPassword
    );
  }
  return user;
};

export const getUserData = (user: any) => {
  const { firstName, lastName, email, age, role } = user;
  return { firstName, lastName, email, age, role };
};

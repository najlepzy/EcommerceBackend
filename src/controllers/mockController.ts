import { Request, Response } from "express";
import User from "@models/userModel";
import Pet from "@models/petModel";
import { messages, HttpStatusCodes } from "@utils/messages";
import { generateMockPet, generateMockUser } from "mocks/mockingModule";

export const getMockingPets = (req: Request, res: Response) => {
  const pets = Array.from({ length: 10 }, generateMockPet);
  return res.status(HttpStatusCodes.OK).json(pets);
};

export const getMockingUsers = (req: Request, res: Response) => {
  const users = Array.from({ length: 50 }, generateMockUser);
  return res.status(HttpStatusCodes.OK).json(users);
};

export const generateMockData = async (req: Request, res: Response) => {
  const { users, pets } = req.body;

  if (!users || !pets) {
    return res
      .status(HttpStatusCodes.BAD_REQUEST)
      .json({ message: messages.invalidProductsFormat });
  }

  try {
    const mockUsers = Array.from({ length: users }, generateMockUser);
    const mockPets = Array.from({ length: pets }, generateMockPet);

    await User.insertMany(mockUsers);
    await Pet.insertMany(mockPets);

    return res.status(HttpStatusCodes.CREATED).json({
      message: messages.success,
      users,
      pets,
    });
  } catch (error) {
    console.error(messages.internalServerError, error);
    return res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: messages.internalServerError });
  }
};

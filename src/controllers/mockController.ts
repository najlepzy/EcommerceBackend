import { Request, Response } from "express";
import User from "@models/userModel";
import Pet from "@models/petModel";
import { messages, HttpStatusCodes } from "@utils/messages";
import { generateMockPet, generateMockUser } from "mocks/mockingModule";

export const getMockingPets = (req: Request, res: Response): void => {
  try {
    const pets = Array.from({ length: 10 }, generateMockPet);
    res.status(HttpStatusCodes.OK).json(pets);
  } catch (error) {
    console.error("Error generating mock pets:", error);
    res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
      .send(messages.internalServerError);
  }
};

export const getMockingUsers = (req: Request, res: Response): void => {
  try {
    const users = Array.from({ length: 50 }, generateMockUser);
    res.status(HttpStatusCodes.OK).json(users);
  } catch (error) {
    console.error("Error generating mock users:", error);
    res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
      .send(messages.internalServerError);
  }
};

export const generateMockData = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { users, pets } = req.body;

  if (!users || !pets) {
    res
      .status(HttpStatusCodes.BAD_REQUEST)
      .json({ message: messages.invalidProductsFormat });
    return;
  }

  try {
    const mockUsers = Array.from({ length: users }, generateMockUser);
    const mockPets = Array.from({ length: pets }, generateMockPet);

    await User.insertMany(mockUsers);
    await Pet.insertMany(mockPets);

    res.status(HttpStatusCodes.CREATED).json({
      message: messages.success,
      users,
      pets,
    });
  } catch (error) {
    console.error("Error generating mock data:", error);
    res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: messages.internalServerError });
  }
};

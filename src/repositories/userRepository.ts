import User from "../models/userModel";
import { userDao } from "../dao/userDao";
import { UserDto } from "../dto/userDto";
import { messages } from "../utils/messages";

class UserRepository {
  async registerUser(userData: UserDto): Promise<InstanceType<typeof User>> {
    const existingUser = await userDao.findUserByEmail(userData.email);
    if (existingUser) {
      throw new Error(messages.userAlreadyRegistered);
    }
    return await userDao.createUser(userData);
  }

  async findUserByEmail(
    email: string
  ): Promise<InstanceType<typeof User> | null> {
    return await userDao.findUserByEmail(email);
  }
}

export const userRepository = new UserRepository();

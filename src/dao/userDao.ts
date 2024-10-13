import User from "../models/userModel";
import { UserDto } from "../dto/userDto";

class UserDao {
  async createUser(userData: UserDto): Promise<InstanceType<typeof User>> {
    const user = new User(userData);
    await user.save();
    return user;
  }

  async findUserByEmail(
    email: string
  ): Promise<InstanceType<typeof User> | null> {
    return User.findOne({ email });
  }
}

export const userDao = new UserDao();

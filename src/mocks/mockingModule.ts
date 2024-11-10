import bcrypt from "bcrypt";
import { UserDto } from "@dto/userDto";
import { PetDto } from "@dto/petDto";
import { randomInt } from "crypto";

export function generateMockUser(): UserDto {
  const roles = ["user", "admin"];
  const user: UserDto = {
    firstName: `User${Math.random().toString(36).substring(7)}`,
    lastName: `Last${Math.random().toString(36).substring(7)}`,
    email: `user${Math.random().toString(36).substring(7)}@example.com`,
    age: randomInt(18, 60),
    password: bcrypt.hashSync("coder123", 10),
    role: roles[randomInt(0, roles.length)],
    pets: [],
  };
  return user;
}

export function generateMockPet(): PetDto {
  return {
    name: `Pet${Math.random().toString(36).substring(7)}`,
    type: "dog",
    breed: `Breed${Math.random().toString(36).substring(7)}`,
    age: randomInt(1, 10),
  };
}

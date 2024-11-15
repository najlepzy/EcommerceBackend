import bcrypt from "bcrypt";
import { UserDto } from "@dto/userDto";
import { PetDto } from "@dto/petDto";
import { faker } from "@faker-js/faker";
import { randomInt } from "crypto";

export function generateMockUser(): UserDto {
  const roles = ["user", "admin"];
  const user: UserDto = {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    age: faker.number.int({ min: 18, max: 60 }),
    password: bcrypt.hashSync("coder123", 10),
    role: roles[randomInt(0, roles.length)],
    pets: [],
  };
  return user;
}

export function generateMockPet(): PetDto {
  return {
    name: faker.person.firstName(),
    type: faker.helpers.arrayElement(["dog", "cat", "rabbit", "parrot"]),
    breed: faker.animal.type(),
    age: faker.number.int({ min: 1, max: 15 }),
  };
}

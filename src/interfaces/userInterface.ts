import mongoose, { Document } from "mongoose";

export interface IUserMethods {
  comparePassword(candidatePassword: string): Promise<boolean>;
}

export interface User extends Document, IUserMethods {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  password: string;
  cart: mongoose.Schema.Types.ObjectId;
  role: string;
}

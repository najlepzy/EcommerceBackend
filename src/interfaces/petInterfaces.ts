import { Document } from "mongoose";

export interface Pet extends Document {
  name: string;
  type: string;
  breed: string;
  age: number;
}

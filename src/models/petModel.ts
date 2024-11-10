import mongoose, { Schema, Document } from "mongoose";

interface Pet extends Document {
  name: string;
  type: string;
  breed: string;
  age: number;
}

const petSchema: Schema<Pet> = new Schema(
  {
    name: { type: String, required: true },
    type: { type: String, required: true },
    breed: { type: String, required: true },
    age: { type: Number, required: true },
  },
  { versionKey: false }
);

export default mongoose.model<Pet>("Pet", petSchema);

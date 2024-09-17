import mongoose, { Schema } from "mongoose";
import { Cart } from "../interfaces/cartInterfaces";

const cartSchema: Schema = new Schema(
  {
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, default: 1 },
      },
    ],
  },
  { versionKey: false }
);

export default mongoose.model<Cart>("carts", cartSchema);

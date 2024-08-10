import mongoose, { Schema, Document } from "mongoose";

export interface CartProduct {
  product: mongoose.Types.ObjectId;
  quantity: number;
}

export interface Cart extends Document {
  products: CartProduct[];
}

const cartSchema: Schema = new Schema(
  {
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "products",
          required: true,
        },
        quantity: { type: Number, default: 1 },
      },
    ],
  },
  { versionKey: false }
);

export default mongoose.model<Cart>("carts", cartSchema);

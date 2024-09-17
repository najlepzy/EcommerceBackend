import mongoose from "mongoose";

export interface CartProduct {
  product: mongoose.Types.ObjectId;
  quantity: number;
}

export interface Cart extends mongoose.Document {
  products: CartProduct[];
}

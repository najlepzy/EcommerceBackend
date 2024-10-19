import mongoose, { Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import { Product, ProductModel } from "@interfaces/productInterfaces";

const productSchema: Schema<Product> = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    status: { type: Boolean, default: true },
    stock: { type: Number, required: true },
    category: { type: String, required: true },
    thumbnails: { type: [String], default: [] },
  },
  {
    versionKey: false,
  }
);

productSchema.plugin(mongoosePaginate);

export default mongoose.model<Product, ProductModel<Product>>(
  "Product",
  productSchema
);

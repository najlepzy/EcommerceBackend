import mongoose, { Schema, Document, Model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

export interface Product extends Document {
  title: string;
  description: string;
  code: string;
  price: number;
  status: boolean;
  stock: number;
  category: string;
  thumbnails: string[];
}

interface PaginateResult<T> {
  docs: T[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage?: number | null;
  nextPage?: number | null;
}

interface PaginateOptions {
  select?: object | string;
  sort?: object | string;
  customLabels?: object;
  populate?: object | string | Array<object | string>;
  lean?: boolean;
  leanWithId?: boolean;
  offset?: number;
  page?: number;
  limit?: number;
}

interface ProductModel<T extends Document> extends Model<T> {
  paginate(
    query?: object,
    options?: PaginateOptions,
    callback?: (err: any, result: PaginateResult<T>) => void
  ): Promise<PaginateResult<T>>;
}

const productSchema: Schema = new Schema(
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

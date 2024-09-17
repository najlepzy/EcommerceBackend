import { Document, Model } from "mongoose";

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

export interface PaginateResult<T> {
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

export interface PaginateOptions {
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

export interface ProductModel<T extends Document> extends Model<T> {
  paginate(
    query?: object,
    options?: PaginateOptions,
    callback?: (err: any, result: PaginateResult<T>) => void
  ): Promise<PaginateResult<T>>;
}

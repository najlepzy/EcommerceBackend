import Product from "../models/productModel";
import { Product as ProductType } from "../interfaces/productInterfaces";
import { messages } from "../utils/messages";

export class ProductService {
  async getAllProducts(
    page: number = 1,
    limit: number = 10,
    query: any = {},
    sort: any = {}
  ): Promise<any> {
    try {
      return Product.paginate(query, { page, limit, lean: true, sort });
    } catch (error: unknown) {
      console.error(messages.fetchProductsFail);
      throw new Error(messages.fetchProductsFail);
    }
  }

  async getProductById(id: string): Promise<ProductType | null> {
    try {
      const product = await Product.findById(id);
      if (!product) {
        throw new Error(messages.productNotFound);
      }
      return product;
    } catch (error: unknown) {
      console.error(handleError(error));
      throw new Error(messages.productNotFound);
    }
  }

  async addProduct(productData: Omit<ProductType, "id">): Promise<ProductType> {
    try {
      return new Product(productData).save();
    } catch (error: unknown) {
      console.error(handleError(error));
      throw new Error(messages.productAddFail);
    }
  }

  async updateProduct(
    id: string,
    updateData: Partial<Omit<ProductType, "id">>
  ): Promise<ProductType | null> {
    try {
      const updatedProduct = await Product.findByIdAndUpdate(id, updateData, {
        new: true,
      });
      if (!updatedProduct) {
        throw new Error(messages.productNotFound);
      }
      return updatedProduct;
    } catch (error: unknown) {
      console.error(handleError(error));
      throw new Error(messages.productUpdateFail);
    }
  }

  async deleteProduct(id: string): Promise<boolean> {
    try {
      const result = await Product.findByIdAndDelete(id);
      if (!result) {
        throw new Error(messages.productDeleteFail);
      }
      return true;
    } catch (error: unknown) {
      console.error(handleError(error));
      throw new Error(messages.productDeleteFail);
    }
  }
}

function handleError(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  return messages.unknownError;
}

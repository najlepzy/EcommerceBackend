import Product from "../models/productModel";
import { Product as ProductType } from "../interfaces/productInterfaces";

export class ProductService {
  async getAllProducts(
    page: number = 1,
    limit: number = 10,
    query: any = {},
    sort: any = {}
  ): Promise<any> {
    return Product.paginate(query, { page, limit, lean: true, sort });
  }

  async getProductById(id: string): Promise<ProductType | null> {
    return Product.findById(id) as Promise<ProductType | null>;
  }

  async addProduct(productData: Omit<ProductType, "id">): Promise<ProductType> {
    return new Product(productData).save() as Promise<ProductType>;
  }

  async updateProduct(
    id: string,
    updateData: Partial<Omit<ProductType, "id">>
  ): Promise<ProductType | null> {
    return Product.findByIdAndUpdate(id, updateData, {
      new: true,
    }) as Promise<ProductType | null>;
  }

  async deleteProduct(id: string): Promise<boolean> {
    return (await Product.findByIdAndDelete(id)) !== null;
  }
}

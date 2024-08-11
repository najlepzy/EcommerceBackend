import Product, { Product as ProductType } from "../models/productModel";

export class ProductService {
  async getAllProducts(page: number = 1, limit: number = 10, query: any = {}, sort: any = {}): Promise<any> {
    return Product.paginate(query, { page, limit, lean: true, sort });
  }

  async getProductById(id: string): Promise<ProductType | null> {
    return Product.findById(id);
  }

  async addProduct(productData: Omit<ProductType, "id">): Promise<ProductType> {
    return new Product(productData).save();
  }

  async updateProduct(id: string, updateData: Partial<Omit<ProductType, "id">>): Promise<ProductType | null> {
    return Product.findByIdAndUpdate(id, updateData, { new: true });
  }

  async deleteProduct(id: string): Promise<boolean> {
    return (await Product.findByIdAndDelete(id)) !== null;
  }
}

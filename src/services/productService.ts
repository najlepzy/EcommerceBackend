import Product, { Product as ProductType } from "../models/productModel";

export class ProductService {
  async getAllProducts(limit?: number): Promise<ProductType[]> {
    return limit ? Product.find().limit(limit) : Product.find();
  }

  async getProductById(id: string): Promise<ProductType | null> {
    return Product.findById(id);
  }

  async addProduct(productData: Omit<ProductType, "id">): Promise<ProductType> {
    const newProduct = new Product(productData);
    return newProduct.save();
  }

  async updateProduct(
    id: string,
    updateData: Partial<Omit<ProductType, "id">>
  ): Promise<ProductType | null> {
    return Product.findByIdAndUpdate(id, updateData, { new: true });
  }

  async deleteProduct(id: string): Promise<boolean> {
    const result = await Product.findByIdAndDelete(id);
    return result !== null;
  }
}

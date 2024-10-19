import Product from "@models/productModel";
import { Product as ProductType } from "@interfaces/productInterfaces";
import { ProductDTO } from "@dto/productDto";

export class ProductDAO {
  async findAll(
    query: object,
    page: number,
    limit: number,
    sort: object
  ): Promise<any> {
    return Product.paginate(query, { page, limit, lean: true, sort });
  }

  async findById(id: string): Promise<ProductType | null> {
    return Product.findById(id);
  }

  async create(productData: ProductDTO): Promise<ProductType> {
    const product = new Product(productData);
    return product.save();
  }

  async update(
    id: string,
    updateData: Partial<ProductDTO>
  ): Promise<ProductType | null> {
    return Product.findByIdAndUpdate(id, updateData, { new: true });
  }

  async delete(id: string): Promise<boolean> {
    const result = await Product.findByIdAndDelete(id);
    return !!result;
  }
}

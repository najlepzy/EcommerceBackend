import { ProductDTO } from "@dto/productDto";
import { Product as ProductType } from "@interfaces/productInterfaces";
import { ProductRepository } from "@repositories/productRepository";

export class ProductService {
  private productRepository: ProductRepository;

  constructor() {
    this.productRepository = new ProductRepository();
  }

  async getAllProducts(
    page: number = 1,
    limit: number = 10,
    query: any = {},
    sort: any = {}
  ): Promise<any> {
    return this.productRepository.getAllProducts(page, limit, query, sort);
  }

  async getProductById(id: string): Promise<ProductType | null> {
    return this.productRepository.getProductById(id);
  }

  async addProduct(productData: ProductDTO): Promise<ProductType> {
    return this.productRepository.addProduct(productData);
  }

  async updateProduct(
    id: string,
    updateData: Partial<ProductDTO>
  ): Promise<ProductType | null> {
    return this.productRepository.updateProduct(id, updateData);
  }

  async deleteProduct(id: string): Promise<boolean> {
    return this.productRepository.deleteProduct(id);
  }
}

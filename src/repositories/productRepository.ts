import { ProductDAO } from "@dao/productDao";
import { ProductDTO } from "@dto/productDto";
import { Product as ProductType } from "@interfaces/productInterfaces";

export class ProductRepository {
  private productDAO: ProductDAO;

  constructor() {
    this.productDAO = new ProductDAO();
  }

  async getAllProducts(
    page: number,
    limit: number,
    query: object,
    sort: object
  ): Promise<any> {
    return this.productDAO.findAll(query, page, limit, sort);
  }

  async getProductById(id: string): Promise<ProductType | null> {
    return this.productDAO.findById(id);
  }

  async addProduct(productData: ProductDTO): Promise<ProductType> {
    return this.productDAO.create(productData);
  }

  async updateProduct(
    id: string,
    updateData: Partial<ProductDTO>
  ): Promise<ProductType | null> {
    return this.productDAO.update(id, updateData);
  }

  async deleteProduct(id: string): Promise<boolean> {
    return this.productDAO.delete(id);
  }
}

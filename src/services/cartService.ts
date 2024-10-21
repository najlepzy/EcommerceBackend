import { CartDTO } from "@dto/cartDto";
import { CartRepository } from "@repositories/cartRepository";

export class CartService {
  private cartRepository: CartRepository;

  constructor() {
    this.cartRepository = new CartRepository();
  }

  async createCart(): Promise<CartDTO> {
    return this.cartRepository.createCart();
  }

  async getCartById(id: string): Promise<CartDTO | null> {
    return this.cartRepository.getCartById(id);
  }

  async addProductToCart(
    cartId: string,
    productId: string
  ): Promise<CartDTO | null> {
    return this.cartRepository.addProductToCart(cartId, productId);
  }

  async deleteProductFromCart(
    cartId: string,
    productId: string
  ): Promise<CartDTO | null> {
    return this.cartRepository.deleteProductFromCart(cartId, productId);
  }

  async replaceCartProducts(
    cartId: string,
    products: Array<{ productId: string; quantity: number }>
  ): Promise<CartDTO | null> {
    return this.cartRepository.replaceCartProducts(cartId, products);
  }

  async updateProductQuantity(
    cartId: string,
    productId: string,
    quantity: number
  ): Promise<CartDTO | null> {
    return this.cartRepository.updateProductQuantity(
      cartId,
      productId,
      quantity
    );
  }

  async removeAllProducts(cartId: string): Promise<CartDTO | null> {
    return this.cartRepository.removeAllProducts(cartId);
  }

  async purchaseCart(
    cartId: string,
    purchaserEmail: string
  ): Promise<{
    success: boolean;
    message: string;
    cart?: CartDTO;
    failedProducts?: string[];
  }> {
    return this.cartRepository.purchaseCart(cartId, purchaserEmail);
  }
}

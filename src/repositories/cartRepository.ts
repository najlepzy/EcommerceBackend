import { CartDAO } from "@dao/cartDao";
import { CartDTO } from "@dto/cartDto";

export class CartRepository {
  private cartDAO: CartDAO;

  constructor() {
    this.cartDAO = new CartDAO();
  }

  async createCart(): Promise<CartDTO> {
    const cart = await this.cartDAO.createCart();
    return new CartDTO(cart);
  }

  async getCartById(id: string): Promise<CartDTO | null> {
    const cart = await this.cartDAO.getCartById(id);
    return cart ? new CartDTO(cart) : null;
  }

  async addProductToCart(
    cartId: string,
    productId: string
  ): Promise<CartDTO | null> {
    const cart = await this.cartDAO.addProductToCart(cartId, productId);
    return cart ? new CartDTO(cart) : null;
  }

  async deleteProductFromCart(
    cartId: string,
    productId: string
  ): Promise<CartDTO | null> {
    const cart = await this.cartDAO.deleteProductFromCart(cartId, productId);
    return cart ? new CartDTO(cart) : null;
  }

  async replaceCartProducts(
    cartId: string,
    products: Array<{ productId: string; quantity: number }>
  ): Promise<CartDTO | null> {
    const cart = await this.cartDAO.replaceCartProducts(cartId, products);
    return cart ? new CartDTO(cart) : null;
  }

  async updateProductQuantity(
    cartId: string,
    productId: string,
    quantity: number
  ): Promise<CartDTO | null> {
    const cart = await this.cartDAO.updateProductQuantity(
      cartId,
      productId,
      quantity
    );
    return cart ? new CartDTO(cart) : null;
  }

  async removeAllProducts(cartId: string): Promise<CartDTO | null> {
    const cart = await this.cartDAO.removeAllProducts(cartId);
    return cart ? new CartDTO(cart) : null;
  }
}

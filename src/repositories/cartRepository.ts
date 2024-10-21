import { CartDAO, ProductDAO } from "@dao/index";
import { CartDTO } from "@dto/cartDto";
import { TicketService } from "@services/ticketService";
import { Helper } from "@utils/cartHelper";

import { messages } from "@utils/messages";

export class CartRepository {
  private cartDAO: CartDAO;
  private productDAO: ProductDAO;
  private ticketService: TicketService;

  constructor() {
    this.cartDAO = new CartDAO();
    this.productDAO = new ProductDAO();
    this.ticketService = new TicketService();
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

  async purchaseCart(cartId: string, purchaserEmail: string) {
    const cart = await this.cartDAO.getCartById(cartId);
    if (!cart) {
      return { success: false, message: messages.cartNotFound };
    }

    const { updatedProducts, failedProducts, totalAmount } =
      await Helper.updateProductStock(cart.products, this.productDAO);

    if (updatedProducts.length > 0) {
      const ticketData = {
        code: `TICKET-${Date.now()}`,
        purchase_datetime: new Date(),
        amount: totalAmount,
        purchaser: purchaserEmail,
      };

      await this.ticketService.createTicket(ticketData);
    }

    cart.products = cart.products.filter((item) =>
      failedProducts.includes(item.product.toString())
    );
    await cart.save();

    return {
      success: true,
      message: messages.purchaseCompleted,
      cart: new CartDTO({
        ...cart.toObject(),
        products: updatedProducts,
      }),
      failedProducts,
    };
  }
}

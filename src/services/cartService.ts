import mongoose from "mongoose";
import Cart, { Cart as CartType, CartProduct } from "../models/cartModel";

export class CartService {
  async createCart(): Promise<CartType> {
    const newCart = new Cart({ products: [] });
    return newCart.save();
  }

  async getCartById(id: string): Promise<CartType | null> {
    return Cart.findById(id).populate("products.product");
  }

  async addProductToCart(
    cartId: string,
    productId: string
  ): Promise<CartType | null> {
    const cart = await Cart.findById(cartId);

    if (!cart) return null;

    const existingProduct = cart.products.find(
      (product) => product.product.toString() === productId
    );

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      const newProduct: CartProduct = {
        product: new mongoose.Types.ObjectId(productId),
        quantity: 1,
      };
      cart.products.push(newProduct);
    }

    return cart.save();
  }
}

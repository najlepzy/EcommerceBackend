import mongoose from "mongoose";
import { Cart } from "../interfaces/cartInterfaces";
import CartModel from "../models/cartModel";
import { messages } from "../utils/messages";

export class CartService {
  async createCart(): Promise<Cart> {
    const newCart = new CartModel({ products: [] });
    return newCart.save();
  }

  async getCartById(id: string): Promise<Cart | null> {
    return CartModel.findById(id).populate("products.product");
  }

  async addProductToCart(
    cartId: string,
    productId: string
  ): Promise<Cart | null> {
    const cart = await CartModel.findById(cartId);
    if (!cart) return null;

    const existingProduct = cart.products.find(
      (product) => product.product.toString() === productId
    );
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.products.push({
        product: new mongoose.Types.ObjectId(productId),
        quantity: 1,
      });
    }

    return cart.save();
  }

  async deleteProductFromCart(
    cartId: string,
    productId: string
  ): Promise<Cart | null> {
    const cart = await CartModel.findById(cartId);
    if (!cart) return null;

    const productIndex = cart.products.findIndex(
      (product) => product.product.toString() === productId
    );
    if (productIndex > -1) {
      cart.products.splice(productIndex, 1);
    } else {
      return null;
    }

    return cart.save();
  }

  async replaceCartProducts(
    cartId: string,
    products: Array<{ productId: string; quantity: number }>
  ): Promise<Cart | null> {
    const cart = await CartModel.findById(cartId);
    if (!cart) throw new Error(messages.cartNotFound);

    cart.products = products.map((product) => ({
      product: new mongoose.Types.ObjectId(product.productId),
      quantity: product.quantity,
    }));

    return cart.save();
  }

  async updateProductQuantity(
    cartId: string,
    productId: string,
    quantity: number
  ): Promise<Cart | null> {
    const cart = await CartModel.findById(cartId);
    if (!cart) return null;

    const productToUpdate = cart.products.find(
      (product) => product.product.toString() === productId
    );
    if (productToUpdate) {
      productToUpdate.quantity = quantity;
    }

    return cart.save();
  }

  async removeAllProducts(cartId: string): Promise<Cart | null> {
    const cart = await CartModel.findById(cartId);
    if (!cart) return null;

    cart.products = [];

    return cart.save();
  }
}

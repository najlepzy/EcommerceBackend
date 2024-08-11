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
    existingProduct
      ? (existingProduct.quantity += 1)
      : cart.products.push({
          product: new mongoose.Types.ObjectId(productId),
          quantity: 1,
        });

    return cart.save();
  }

  async deleteProductFromCart(
    cartId: string,
    productId: string
  ): Promise<CartType | null> {
    const cart = await Cart.findById(cartId);
    if (!cart) return null;

    if (cart.products.length === 0) {
      throw new Error("There are no products to delete in this cart");
    }

    const productIndex = cart.products.findIndex(
      (product) => product.product.toString() === productId
    );
    return productIndex > -1
      ? (cart.products.splice(productIndex, 1), cart.save())
      : null;
  }

  async replaceCartProducts(
    cartId: string,
    products: Array<{ productId: string; quantity: number }>
  ): Promise<CartType | null> {
    const cart = await Cart.findById(cartId);
    if (!cart) throw new Error("Cart not found");

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
  ): Promise<CartType | null> {
    const cart = await Cart.findById(cartId);
    if (!cart) return null;

    const productToUpdate = cart.products.find(
      (product) => product.product.toString() === productId
    );
    productToUpdate && (productToUpdate.quantity = quantity);

    return cart.save();
  }

  async removeAllProducts(cartId: string): Promise<CartType | null> {
    const cart = await Cart.findById(cartId);
    if (!cart) return null;

    cart.products = [];

    return cart.save();
  }
}

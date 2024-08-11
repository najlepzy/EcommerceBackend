import { Request, Response } from "express";
import { CartService } from "../services/cartService";
import mongoose from "mongoose";

const cartService = new CartService();

export const createCart = async (req: Request, res: Response) => {
  const newCart = await cartService.createCart();
  res.status(201).json(newCart);
};

export const getCartById = async (req: Request, res: Response) => {
  const id = req.params.cid;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send("Invalid cart ID");
  }

  const cart = await cartService.getCartById(id);
  return cart ? res.json(cart) : res.status(404).send("Cart not found");
};

export const addProductToCart = async (req: Request, res: Response) => {
  const updatedCart = await cartService.addProductToCart(
    req.params.cid,
    req.params.pid
  );
  return updatedCart
    ? res.json(updatedCart)
    : res.status(404).send("Cart not found");
};

export const updateCart = async (req: Request, res: Response) => {
  const cartId = req.params.cid;
  const products = req.body.products;

  if (!Array.isArray(products)) {
    return res
      .status(400)
      .send("Invalid products format, expected an array of products.");
  }

  try {
    const updatedCart = await cartService.replaceCartProducts(cartId, products);
    res.json(updatedCart);
  } catch (error) {
    if (error instanceof Error) {
      res
        .status(500)
        .send(error.message || "An internal server error occurred.");
    } else {
      res.status(500).send("An unexpected error occurred.");
    }
  }
};

export const updateProductInCart = async (req: Request, res: Response) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;

  if (!quantity || quantity < 1) {
    return res.status(400).send("Invalid quantity");
  }

  const updatedCart = await cartService.updateProductQuantity(
    cid,
    pid,
    quantity
  );
  return updatedCart
    ? res.json(updatedCart)
    : res.status(404).send("Product not found in cart");
};

export const deleteProductFromCart = async (req: Request, res: Response) => {
  const cartId = req.params.cid;
  const productId = req.params.pid;

  try {
    const cart = await cartService.deleteProductFromCart(cartId, productId);
    cart ? res.json(cart) : res.status(404).send("Product not found in cart");
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "An unexpected error occurred";
    res
      .status(
        error instanceof Error &&
          message === "There are no products to delete in this cart"
          ? 400
          : 500
      )
      .send(message);
  }
};

export const deleteAllProductsFromCart = async (
  req: Request,
  res: Response
) => {
  const cartId = req.params.cid;
  const cart = await cartService.removeAllProducts(cartId);
  cart
    ? res
        .status(200)
        .json({ message: "All products were removed from the cart", cart })
    : res.status(404).send("Cart not found");
};

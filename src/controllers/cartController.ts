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

  return !mongoose.Types.ObjectId.isValid(id)
    ? res.status(400).send("Invalid cart ID")
    : res.json(await cartService.getCartById(id)) ||
        res.status(404).send("Cart not found");
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

  return !Array.isArray(products)
    ? res
        .status(400)
        .send("Invalid products format, expected an array of products.")
    : await cartService
        .replaceCartProducts(cartId, products)
        .then((updatedCart) => res.json(updatedCart))
        .catch((error) =>
          res
            .status(
              error instanceof Error &&
                error.message === "There are no products to delete in this cart"
                ? 400
                : 500
            )
            .send(
              error instanceof Error
                ? error.message || "An internal server error occurred."
                : "An unexpected error occurred."
            )
        );
};

export const updateProductInCart = async (req: Request, res: Response) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;

  return !quantity || quantity < 1
    ? res.status(400).send("Invalid quantity")
    : res.json(await cartService.updateProductQuantity(cid, pid, quantity)) ||
        res.status(404).send("Product not found in cart");
};

export const deleteProductFromCart = async (req: Request, res: Response) => {
  const cartId = req.params.cid;
  const productId = req.params.pid;

  try {
    const cart = await cartService.deleteProductFromCart(cartId, productId);
    return cart
      ? res.json(cart)
      : res.status(404).send("Product not found in cart");
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "An unexpected error occurred";
    return res
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
  return cart
    ? res
        .status(200)
        .json({ message: "All products were removed from the cart", cart })
    : res.status(404).send("Cart not found");
};

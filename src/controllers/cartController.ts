import { Request, Response } from "express";
import mongoose from "mongoose";
import { CartService } from "@services/cartService";
import { messages, HttpStatusCodes } from "@utils/messages";
import { User } from "@interfaces/userInterface";

const cartService = new CartService();

export const createCart = async (req: Request, res: Response) => {
  const newCart = await cartService.createCart();
  res.status(HttpStatusCodes.CREATED).json(newCart);
};

export const getCartById = async (req: Request, res: Response) => {
  const id = req.params.cid;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(HttpStatusCodes.BAD_REQUEST).send(messages.invalidCartID);
  } else {
    const cart = await cartService.getCartById(id);
    cart
      ? res.json(cart)
      : res.status(HttpStatusCodes.NOT_FOUND).send(messages.cartNotFound);
  }
};

export const addProductToCart = async (req: Request, res: Response) => {
  const updatedCart = await cartService.addProductToCart(
    req.params.cid,
    req.params.pid
  );
  updatedCart
    ? res.json(updatedCart)
    : res.status(HttpStatusCodes.NOT_FOUND).send(messages.cartNotFound);
};

export const updateCart = async (req: Request, res: Response) => {
  const cartId = req.params.cid;
  const products = req.body.products;
  if (!Array.isArray(products)) {
    res
      .status(HttpStatusCodes.BAD_REQUEST)
      .send(messages.invalidProductsFormat);
  } else {
    try {
      const updatedCart = await cartService.replaceCartProducts(
        cartId,
        products
      );
      res.json(updatedCart);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : messages.unknownError;
      res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send(message);
    }
  }
};

export const updateProductInCart = async (req: Request, res: Response) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;
  if (!quantity || quantity < 1) {
    res.status(HttpStatusCodes.BAD_REQUEST).send(messages.invalidQuantity);
  } else {
    const updatedCart = await cartService.updateProductQuantity(
      cid,
      pid,
      quantity
    );
    updatedCart
      ? res.json(updatedCart)
      : res.status(HttpStatusCodes.NOT_FOUND).send(messages.productNotFound);
  }
};

export const deleteProductFromCart = async (req: Request, res: Response) => {
  const cartId = req.params.cid;
  const productId = req.params.pid;
  try {
    const cart = await cartService.deleteProductFromCart(cartId, productId);
    cart
      ? res.json(cart)
      : res.status(HttpStatusCodes.NOT_FOUND).send(messages.productNotFound);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : messages.unknownError;
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send(message);
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
        .status(HttpStatusCodes.OK)
        .json({ message: messages.allProductsRemoved, cart })
    : res.status(HttpStatusCodes.NOT_FOUND).send(messages.cartNotFound);
};

export const purchaseCart = async (req: Request, res: Response) => {
  const { cid } = req.params;
  const purchaserEmail = (req.user as User)?.email;

  if (!purchaserEmail) {
    return res.status(HttpStatusCodes.UNAUTHORIZED).json({
      message: messages.noUserAuthenticated,
    });
  }

  try {
    const result = await cartService.purchaseCart(cid, purchaserEmail);
    return !result.success
      ? res.status(HttpStatusCodes.NOT_FOUND).json({
          message: result.message,
          failedProducts: result.failedProducts || [],
        })
      : res.status(HttpStatusCodes.OK).json({
          message: result.message,
          cart: result.cart,
          failedProducts: result.failedProducts || [],
        });
  } catch (error) {
    console.error(error);
    return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
      message: messages.purchaseError,
    });
  }
};

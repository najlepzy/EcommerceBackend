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
  if (cart) {
    res.json(cart);
  } else {
    res.status(404).send("Cart not found");
  }
};

export const addProductToCart = async (req: Request, res: Response) => {
  const updatedCart = await cartService.addProductToCart(
    req.params.cid,
    req.params.pid
  );
  if (updatedCart) {
    res.json(updatedCart);
  } else {
    res.status(404).send("Cart not found");
  }
};

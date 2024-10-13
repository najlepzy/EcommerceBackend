import { Request, Response } from "express";
import { ProductService } from "../services/productService";
import mongoose from "mongoose";
import { messages, HttpStatusCodes } from "../utils/messages";
import { io } from "../server";

const productService = new ProductService();

export const getAllProducts = async (req: Request, res: Response) => {
  const { page, limit, sort, query } = req.query;
  const pageNumber = parseInt(page as string) || 1;
  const limitNumber = parseInt(limit as string) || 10;
  const sortOption =
    sort === "desc" ? { price: -1 } : sort === "asc" ? { price: 1 } : {};

  const queryObj = query && query !== "all" ? { category: query } : {};

  try {
    const result = await productService.getAllProducts(
      pageNumber,
      limitNumber,
      queryObj,
      sortOption
    );
    res.json({
      status: messages.success,
      ...result,
      prevLink: result.hasPrevPage
        ? `${req.protocol}://${req.get("host")}${req.path}?page=${
            result.prevPage
          }&query=${query}&limit=${limit}&sort=${sort}`
        : null,
      nextLink: result.hasNextPage
        ? `${req.protocol}://${req.get("host")}${req.path}?page=${
            result.nextPage
          }&query=${query}&limit=${limit}&sort=${sort}`
        : null,
    });
  } catch (error) {
    console.error(messages.fetchProductsFail, error);
    res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
      .send(messages.fetchProductsFail);
  }
};

export const getProductById = async (req: Request, res: Response) => {
  const id = req.params.pid;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(HttpStatusCodes.BAD_REQUEST)
      .send(messages.invalidIDFormat);
  }

  try {
    const product = await productService.getProductById(id);
    product
      ? res.json(product)
      : res.status(HttpStatusCodes.NOT_FOUND).send(messages.productNotFound);
  } catch (error) {
    console.error(messages.fetchProductsFail, error);
    res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
      .send(messages.internalServerError);
  }
};

export const addProduct = async (req: Request, res: Response) => {
  try {
    const newProduct = await productService.addProduct(req.body);
    io.emit("productAdded", newProduct);
    res.status(HttpStatusCodes.CREATED).json(newProduct);
  } catch (error) {
    console.error(messages.productAddFail, error);
    res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
      .send(messages.productAddFail);
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  const id = req.params.pid;
  try {
    const updatedProduct = await productService.updateProduct(id, req.body);
    if (updatedProduct) {
      io.emit("productUpdated", updatedProduct);
      res.json(updatedProduct);
    } else {
      res.status(HttpStatusCodes.NOT_FOUND).send(messages.productNotFound);
    }
  } catch (error) {
    console.error(messages.productUpdateFail, error);
    res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
      .send(messages.internalServerError);
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  const id = req.params.pid;
  try {
    const success = await productService.deleteProduct(id);
    if (success) {
      io.emit("productDeleted", id);
      res.status(HttpStatusCodes.OK).send(messages.productDeleteSuccess);
    } else {
      res.status(HttpStatusCodes.NOT_FOUND).send(messages.productNotFound);
    }
  } catch (error) {
    console.error(messages.productDeleteFail, error);
    res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
      .send(messages.internalServerError);
  }
};

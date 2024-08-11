import { Request, Response } from "express";
import { ProductService } from "../services/productService";
import mongoose from "mongoose";
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
      status: "success",
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
    console.error("Failed to fetch products with pagination:", error);
    res.status(500).send({
      status: "error",
      payload: "Failed to fetch products due to an unexpected error.",
    });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  const id = req.params.pid;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send("Invalid ID format");
  }

  try {
    const product = await productService.getProductById(id);
    product ? res.json(product) : res.status(404).send("Product not found");
  } catch (error) {
    console.error("Failed to fetch product:", error);
    res.status(500).send("Internal Server Error");
  }
};

export const addProduct = async (req: Request, res: Response) => {
  try {
    const newProduct = await productService.addProduct(req.body);
    io.emit("productAdded", newProduct);
    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Failed to add product:", error);
    res.status(500).send("Failed to add product");
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  const id = req.params.pid;
  try {
    const updatedProduct = await productService.updateProduct(id, req.body);
    updatedProduct
      ? (io.emit("productUpdated", updatedProduct), res.json(updatedProduct))
      : res.status(404).send("Product not found");
  } catch (error) {
    console.error("Failed to update product:", error);
    res.status(500).send("Internal Server Error");
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  const id = req.params.pid;
  try {
    const success = await productService.deleteProduct(id);
    success
      ? (io.emit("productDeleted", id),
        res.status(200).send("Product successfully deleted"))
      : res.status(404).send("Product not found");
  } catch (error) {
    console.error("Failed to delete product:", error);
    res.status(500).send("Internal Server Error");
  }
};

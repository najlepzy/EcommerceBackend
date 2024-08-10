import { Request, Response } from "express";
import { ProductService } from "../services/productService";
import mongoose from "mongoose";

const productService = new ProductService();

export const getAllProducts = async (req: Request, res: Response) => {
  let limit;
  if (req.query.limit) {
    const parsedLimit = parseInt(req.query.limit as string);
    if (!isNaN(parsedLimit)) {
      limit = parsedLimit;
    } else {
      return res.status(400).send("Invalid limit parameter");
    }
  }

  try {
    const products = await productService.getAllProducts(limit);
    res.json(products);
  } catch (error) {
    console.error("Failed to fetch products:", error);
    res.status(500).send("Failed to fetch products");
  }
};

export const getProductById = async (req: Request, res: Response) => {
  const id = req.params.pid;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send("Invalid ID format");
  }

  try {
    const product = await productService.getProductById(id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).send("Product not found");
    }
  } catch (error) {
    console.error("Failed to fetch product:", error);
    res.status(500).send("Internal Server Error");
  }
};

export const addProduct = async (req: Request, res: Response) => {
  try {
    const newProduct = await productService.addProduct(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Failed to add product:", error);
    res.status(500).send("Failed to add product");
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  const updatedProduct = await productService.updateProduct(
    req.params.pid,
    req.body
  );
  if (updatedProduct) {
    res.json(updatedProduct);
  } else {
    res.status(404).send("Product not found");
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  const id = req.params.pid;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send("Invalid ID format");
  }

  try {
    const success = await productService.deleteProduct(id);
    if (success) {
      res.status(200).send("Product successfully deleted");
    } else {
      res.status(404).send("Product not found");
    }
  } catch (error) {
    console.error("Failed to delete product:", error);
    res.status(500).send("Internal Server Error");
  }
};

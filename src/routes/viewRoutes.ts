import { Router } from "express";
import { ProductService } from "../services/productService";

const router = Router();
const productService = new ProductService();

router.get("/", async (req, res) => {
  try {
    const products = await productService.getAllProducts();

    if (products.length > 0) {
      res.render("home", { products, title: "Home Page" });
    } else {
      res.render("home", {
        products: [],
        title: "Home Page",
        message: "No products found.",
      });
    }
  } catch (error) {
    res.status(500).send("Error loading products.");
  }
});

router.get("/realtimeproducts", async (req, res) => {
  try {
    const products = await productService.getAllProducts();

    res.render("realTimeProducts", { products });
  } catch (error) {
    res.status(500).send("Failed to load products.");
  }
});

export default router;

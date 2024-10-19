import { Router } from "express";
import { ProductService } from "@services/productService";
import { CartService } from "@services/cartService";

const router = Router();
const productService = new ProductService();
const cartService = new CartService();

router.get("/", async (req, res) => {
  const { page = 1, limit = 10, sort = "asc", query } = req.query;

  const pageNumber = parseInt(page as string) || 1;
  const limitNumber = parseInt(limit as string) || 10;
  const sortOption =
    sort === "desc" ? { price: -1 } : sort === "asc" ? { price: 1 } : {};

  const cartId = "671423cb2440bded58086df2";

  const allProducts = await productService.getAllProducts(1, 10000, {}, {});
  const uniqueCategories = [
    ...new Set(
      allProducts.docs.map((product: { category: any }) => product.category)
    ),
  ];

  let queryObj: { [key: string]: any } = {};
  if (query && query !== "all") {
    queryObj["category"] = query;
  }

  try {
    const result = await productService.getAllProducts(
      pageNumber,
      limitNumber,
      queryObj,
      sortOption
    );

    const products = result.docs;

    res.render("home", {
      payload: products,
      cartId: cartId,
      title: "Product List",
      totalPages: result.totalPages,
      prevPage: result.prevPage,
      nextPage: result.nextPage,
      page: result.page,
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
      query: query || "",
      limit,
      sort,
      uniqueCategories,
    });
  } catch (error) {
    res.status(500).send("Error loading products.");
  }
});

router.get("/realtimeproducts", async (req, res) => {
  const { page = 1, limit = 10, sort = "asc", query } = req.query;

  const pageNumber = parseInt(page as string) || 1;
  const limitNumber = parseInt(limit as string) || 10;
  const sortOption =
    sort === "desc" ? { price: -1 } : sort === "asc" ? { price: 1 } : {};

  const allProducts = await productService.getAllProducts(1, 10000, {}, {});
  const uniqueCategories = [
    ...new Set(
      allProducts.docs.map((product: { category: any }) => product.category)
    ),
  ];

  let queryObj: { [key: string]: any } = {};
  if (query && query !== "all") {
    queryObj["category"] = query;
  }

  try {
    const result = await productService.getAllProducts(
      pageNumber,
      limitNumber,
      queryObj,
      sortOption
    );

    const products = result.docs;

    res.render("realTimeProducts", {
      payload: products,
      uniqueCategories,
      totalPages: result.totalPages,
      prevPage: result.prevPage,
      nextPage: result.nextPage,
      page: result.page,
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
      query: query || "",
      limit,
      sort,
    });
  } catch (error) {
    res.status(500).send("Failed to load products.");
  }
});

router.get("/carts/66b9181fe1381cdc571ee93e", async (req, res) => {
  const cartId = "66b9181fe1381cdc571ee93e";

  try {
    const cart = await cartService.getCartById(cartId);
    if (!cart) {
      return res.status(404).send("Cart not found");
    }

    res.render("cartView", {
      title: "Your Cart",
      cart,
    });
  } catch (error) {
    res.status(500).send("Failed to load cart");
  }
});
export default router;

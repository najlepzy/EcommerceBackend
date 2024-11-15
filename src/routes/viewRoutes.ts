import { CartService, ProductService } from "@services/index";
import { Router, Request, Response } from "express";

const router = Router();
const productService = new ProductService();
const cartService = new CartService();

router.get("/", async (req: Request, res: Response): Promise<void> => {
  const { page = 1, limit = 10, sort = "asc", query } = req.query;

  const pageNumber = parseInt(page as string) || 1;
  const limitNumber = parseInt(limit as string) || 10;
  const sortOption =
    sort === "desc" ? { price: -1 } : sort === "asc" ? { price: 1 } : {};

  const cartId = "6715f2abb48dd27fed309d99";

  try {
    const allProducts = await productService.getAllProducts(1, 10000, {}, {});
    const uniqueCategories = [
      ...new Set(
        allProducts.docs.map((product: { category: any }) => product.category)
      ),
    ];

    const queryObj: { [key: string]: any } = {};
    if (query && query !== "all") {
      queryObj["category"] = query;
    }

    const result = await productService.getAllProducts(
      pageNumber,
      limitNumber,
      queryObj,
      sortOption
    );

    res.render("home", {
      payload: result.docs,
      cartId,
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
    console.error("Error loading products:", error);
    res.status(500).send("Error loading products.");
  }
});

router.get("/realtimeproducts", async (req: Request, res: Response): Promise<void> => {
  const { page = 1, limit = 10, sort = "asc", query } = req.query;

  const pageNumber = parseInt(page as string) || 1;
  const limitNumber = parseInt(limit as string) || 10;
  const sortOption =
    sort === "desc" ? { price: -1 } : sort === "asc" ? { price: 1 } : {};

  try {
    const allProducts = await productService.getAllProducts(1, 10000, {}, {});
    const uniqueCategories = [
      ...new Set(
        allProducts.docs.map((product: { category: any }) => product.category)
      ),
    ];

    const queryObj: { [key: string]: any } = {};
    if (query && query !== "all") {
      queryObj["category"] = query;
    }

    const result = await productService.getAllProducts(
      pageNumber,
      limitNumber,
      queryObj,
      sortOption
    );

    res.render("realTimeProducts", {
      payload: result.docs,
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
    console.error("Failed to load products:", error);
    res.status(500).send("Failed to load products.");
  }
});

router.get("/carts/66b9181fe1381cdc571ee93e", async (req: Request, res: Response): Promise<void> => {
  const cartId = "66b9181fe1381cdc571ee93e";

  try {
    const cart = await cartService.getCartById(cartId);
    if (!cart) {
      res.status(404).send("Cart not found");
      return;
    }

    res.render("cartView", {
      title: "Your Cart",
      cart,
    });
  } catch (error) {
    console.error("Failed to load cart:", error);
    res.status(500).send("Failed to load cart");
  }
});

export default router;

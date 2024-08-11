import { Router } from "express";
import * as cartController from "../controllers/cartController";

const router = Router();

router.post("/", cartController.createCart);
router.get("/:cid", cartController.getCartById);
router.post("/:cid/product/:pid", cartController.addProductToCart);
router.put("/:cid", cartController.updateCart);
router.put("/:cid/products/:pid", cartController.updateProductInCart);
router.delete("/:cid", cartController.deleteAllProductsFromCart);
router.delete("/:cid/product/:pid", cartController.deleteProductFromCart);

export default router;

import { Router } from "express";
import * as cartController from "../controllers/cartController";

const router = Router();

router.post("/", cartController.createCart);
router.get("/:cid", cartController.getCartById);
router.post("/:cid/product/:pid", cartController.addProductToCart);

export default router;

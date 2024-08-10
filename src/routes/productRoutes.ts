import { Router } from "express";
import * as productController from "../controllers/productController";

const router = Router();

router.get("/", productController.getAllProducts);
router.get("/:pid", productController.getProductById);
router.post("/", productController.addProduct);
router.put("/:pid", productController.updateProduct);
router.delete("/:pid", productController.deleteProduct);

export default router;

import { Router } from "express";
import passport from "passport";
import * as productController from "@controllers/productController";
import { authorizeRoles } from "@middleware/authorization";

const router = Router();

router.get("/", productController.getAllProducts);
router.get("/:pid", productController.getProductById);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  authorizeRoles("admin", "subAdmin"),
  productController.addProduct
);

router.put(
  "/:pid",
  passport.authenticate("jwt", { session: false }),
  authorizeRoles("admin", "subAdmin"),
  productController.updateProduct
);

router.delete(
  "/:pid",
  passport.authenticate("jwt", { session: false }),
  authorizeRoles("admin", "subAdmin"),
  productController.deleteProduct
);

export default router;

import { Router } from "express";
import passport from "passport";
import * as cartController from "@controllers/cartController";
import { authorizeRoles } from "@middleware/authorization";

const router = Router();

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  cartController.createCart
);
router.get(
  "/:cid",
  passport.authenticate("jwt", { session: false }),
  cartController.getCartById
);

router.post(
  "/:cid/product/:pid",
  passport.authenticate("jwt", { session: false }),
  authorizeRoles("user"),
  cartController.addProductToCart
);

router.post(
  "/:cid/purchase",
  passport.authenticate("jwt", { session: false }),
  authorizeRoles("user"),
  cartController.purchaseCart
);

router.put(
  "/:cid",
  passport.authenticate("jwt", { session: false }),
  authorizeRoles("user"),
  cartController.updateCart
);
router.put(
  "/:cid/products/:pid",
  passport.authenticate("jwt", { session: false }),
  authorizeRoles("user"),
  cartController.updateProductInCart
);
router.delete(
  "/:cid/product/:pid",
  passport.authenticate("jwt", { session: false }),
  authorizeRoles("user"),
  cartController.deleteProductFromCart
);
router.delete(
  "/:cid",
  passport.authenticate("jwt", { session: false }),
  authorizeRoles("user"),
  cartController.deleteAllProductsFromCart
);

export default router;

import { Router } from "express";
import passport from "passport";
import * as authController from "../controllers/authController";

const router = Router();

router.post("/register", authController.registerUser);
router.post(
  "/login",
  passport.authenticate("local", { session: false }),
  authController.loginUser
);
router.get(
  "/sessions/current",
  passport.authenticate("jwt", { session: false }),
  authController.getCurrentUser
);

export default router;

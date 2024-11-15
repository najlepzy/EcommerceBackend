import express from "express";
import { engine } from "express-handlebars";
import { allowInsecurePrototypeAccess } from "@handlebars/allow-prototype-access";
import Handlebars from "handlebars";
import path from "path";
import cookieParser from "cookie-parser";
import passport from "@config/passport";
import {
  authRoutes,
  cartRoutes,
  mockRoutes,
  productRoutes,
  viewRoutes,
} from "@routes/index";
import { authorizeRoles, errorHandler } from "@middleware/index";
import { compressionMiddleware } from "@middleware/compression";
import { swaggerSpec, swaggerUi } from "@config/swagger";

const app = express();
app.use(compressionMiddleware);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(passport.initialize());

const handlebars = engine({
  handlebars: allowInsecurePrototypeAccess(Handlebars),
});
app.engine("handlebars", handlebars);
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/", viewRoutes);
app.use("/api", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/mocks", mockRoutes);

app.use(
  "/api/carts",
  passport.authenticate("jwt", { session: false }),
  authorizeRoles("user"),
  cartRoutes
);

app.use(errorHandler);

export default app;

import express from "express";
import { engine } from "express-handlebars";
import { allowInsecurePrototypeAccess } from "@handlebars/allow-prototype-access";
import Handlebars from "handlebars";
import passport from "./config/passport";
import cookieParser from "cookie-parser";
import path from "path";
import { errorHandler } from "./middleware/errorHandler";
import viewRoutes from "./routes/viewRoutes";
import productRoutes from "./routes/productRoutes";
import authRoutes from "./routes/authRoutes";
import cartRoutes from "./routes/cartRoutes";

const app = express();

app.use(express.json());
app.use(passport.initialize());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const handlebars = engine({
  handlebars: allowInsecurePrototypeAccess(Handlebars),
});
app.engine("handlebars", handlebars);
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

app.use("/", viewRoutes);
app.use("/api", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/carts", cartRoutes);

app.use(errorHandler);

export default app;

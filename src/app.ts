import express from "express";
import { engine } from "express-handlebars";
import { allowInsecurePrototypeAccess } from "@handlebars/allow-prototype-access";
import Handlebars from "handlebars";
import path from "path";

import viewRoutes from "./routes/viewRoutes";
import productRoutes from "./routes/productRoutes";
import cartRoutes from "./routes/cartRoutes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const handlebars = engine({
  handlebars: allowInsecurePrototypeAccess(Handlebars),
});
app.engine("handlebars", handlebars);
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

app.use("/", viewRoutes);
app.use("/api/products", productRoutes);
app.use("/api/carts", cartRoutes);

export default app;

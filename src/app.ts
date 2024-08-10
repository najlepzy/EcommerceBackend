import express from "express";
import productRoutes from "./routes/productRoutes";
import cartRoutes from "./routes/cartRoutes";

const app = express();

app.use(express.json());
app.use("/api/products", productRoutes);
app.use("/api/carts", cartRoutes);

export default app;

import express from "express";
const app = express();
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import { notFound, errorHandling } from "./middleware/errorMiddleware.js";

connectDB();

app.get("/", (req, res) => res.send("Api is running"));
app.use("/api/products", productRoutes);

app.use(notFound);
app.use(errorHandling);

app.listen(5000, console.log("app running at 5000"));

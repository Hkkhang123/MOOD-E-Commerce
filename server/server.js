import express from "express";
import cors from "cors";
import dotenv from "dotenv"
import path from "path"

import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/product.routes.js";
import cartRoutes from "./routes/cart.routes.js"
import checkoutRoutes from "./routes/checkout.routes.js"
import orderRoutes from "./routes/order.routes.js"
import uploadRoutes from "./config/cloudinary.js"
import subcriberRoutes from "./routes/subcriber.routes.js"
import adminRoutes from "./routes/admin.routes.js"

dotenv.config()
const app = express();
app.use(express.json());
app.use(cors({
    origin:"https://mood-e-commerce.vercel.app"}));

app.get("/", (req, res) => {
    res.send("HELLO WORLD");
})

app.use("/api/auth",authRoutes);
app.use("/api/products",productRoutes);
app.use("/api/cart", cartRoutes)
app.use("/api/checkout",checkoutRoutes)
app.use("/api/order",orderRoutes)
app.use("/api/upload", uploadRoutes)
app.use("/api", subcriberRoutes)
app.use("/api/admin", adminRoutes)


const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    connectDB();
});
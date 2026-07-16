import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

import http from "http";
import { initializeSocket } from "./socket/socket.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import lockRoutes from "./routes/lockRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";
import deliveryRoutes from "./routes/deliveryRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";

// Start cron jobs
import "./jobs/lockExpiryJob.js";

dotenv.config();

// Connect Database
connectDB();

// Create Express App
const app = express();

// Middlewares
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/admin/products", productRoutes);
app.use("/api/admin/locks", lockRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/delivery", deliveryRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/reports", reportRoutes);

// Public product routes (accessible without admin auth)
import { getPublicProducts, getProductById } from "./controllers/productController.js";
app.get("/api/products", getPublicProducts);
app.get("/api/products/:id", getProductById);

app.get("/", (req, res) => {
  res.send("FreshMart API Running...");
});

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

initializeSocket(server);

server.listen(PORT, () => {
  console.log(`Server Running on port ${PORT}`);
});
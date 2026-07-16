import express from "express";

import { getDashboard } from "../controllers/adminController.js";
import { getAllOrders, updateOrderStatus } from "../controllers/orderController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/dashboard", protect, getDashboard);

// Admin order management
router.get("/orders", protect, getAllOrders);
router.put("/orders/:id/status", protect, updateOrderStatus);

export default router;
import express from "express";

import { protect } from "../middleware/authMiddleware.js";

import {

    getSalesReport,
    getInventoryReport,
    getInventoryLogReport,
    getAuditReport,
    getOrderReport

} from "../controllers/reportController.js";

const router = express.Router();

router.get(
    "/sales",
    protect,
    getSalesReport
);

router.get(
    "/inventory",
    protect,
    getInventoryReport
);

router.get(
    "/inventory-logs",
    protect,
    getInventoryLogReport
);

router.get(
    "/orders",
    protect,
    getOrderReport
);

router.get(
    "/audit",
    protect,
    getAuditReport
);

export default router;
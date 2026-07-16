import express from "express";

import {

    getAssignedOrders,

    acceptOrder,

    updateDeliveryStatus,

    getDeliveryHistory

} from "../controllers/deliveryController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get(
    "/orders",
    protect,
    getAssignedOrders
);

router.put(
    "/orders/:id/accept",
    protect,
    acceptOrder
);

router.put(
    "/orders/:id/status",
    protect,
    updateDeliveryStatus
);

router.get(
    "/history",
    protect,
    getDeliveryHistory
);

export default router;
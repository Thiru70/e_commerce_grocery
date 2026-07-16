import express from "express";

import { protect } from "../middleware/authMiddleware.js";

import {

    getNotifications,

    getUnreadCount,

    markAsRead,

    markAllRead,

    deleteNotification

} from "../controllers/notificationController.js";

const router = express.Router();

router.get(

    "/",

    protect,

    getNotifications

);

router.get(

    "/unread",

    protect,

    getUnreadCount

);

router.put(

    "/read-all",

    protect,

    markAllRead

);

router.put(

    "/:id/read",

    protect,

    markAsRead

);

router.delete(

    "/:id",

    protect,

    deleteNotification

);

export default router;
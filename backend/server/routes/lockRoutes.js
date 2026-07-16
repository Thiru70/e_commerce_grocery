import express from "express";

import { protect } from "../middleware/authMiddleware.js";

import {

    getActiveLocks,

    releaseLock

} from "../controllers/lockController.js";

const router = express.Router();

router.get("/", protect, getActiveLocks);

router.post("/:id/release", protect, releaseLock);

export default router;
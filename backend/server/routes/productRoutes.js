import express from "express";

import upload from "../middleware/uploadMiddleware.js";

import {

    getProducts,

    addProduct,

    updateProduct,

    deleteProduct,

    refillInventory

}
from "../controllers/productController.js";

import {

    protect

}
from "../middleware/authMiddleware.js";

const router=express.Router();

router.get("/",protect,getProducts);

router.post(

    "/",

    protect,

    upload.single("image"),

    addProduct

);

router.put(

    "/:id",

    protect,

    upload.single("image"),

    updateProduct

);

router.delete(

    "/:id",

    protect,

    deleteProduct

);

router.post(
    "/refill/:productId",
    protect,
    refillInventory
);

export default router;
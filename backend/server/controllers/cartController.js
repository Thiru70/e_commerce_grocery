import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

import {
    reserveProduct
}
from "../services/lockService.js";

export const addToCart = async (req, res) => {

    try {

        const {

            productId,

            quantity

        } = req.body;

        const userId = req.user._id;

        const product = await Product.findById(productId);

        if (!product) {

            return res.status(404).json({

                message: "Product not found"

            });

        }

        /*
            Intelligent Locking
        */

        if (
            product.lockEnabled &&
            product.stock < 10
        ) {

            const lock = await reserveProduct(

                productId,

                userId,

                quantity

            );

            return res.status(200).json({

                message: "Product Reserved",

                lock

            });

        }

        /*
            Normal Cart
        */

        let cart = await Cart.findOne({

            userId

        });

        if (!cart) {

            cart = new Cart({

                userId,

                items: []

            });

        }

        const existing = cart.items.find(

            item =>
                item.productId.toString() === productId

        );

        if (existing) {

            existing.quantity += quantity;

        }

        else {

            cart.items.push({

                productId,

                quantity,

                locked: false

            });

        }

        await cart.save();

        res.status(200).json({

            message: "Added To Cart",

            cart

        });

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

export const getCart = async (req, res) => {

    try {

        const cart = await Cart.findOne({

            userId: req.user._id

        }).populate("items.productId");

        res.json(cart);

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

export const removeItem = async (req, res) => {

    try {

        const cart = await Cart.findOne({

            userId: req.user._id

        });

        cart.items = cart.items.filter(

            item =>

                item.productId.toString() !== req.params.id

        );

        await cart.save();

        res.json({

            message: "Removed"

        });

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};
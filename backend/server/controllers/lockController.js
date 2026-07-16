import ProductLock from "../models/ProductLock.js";

import {

    releaseReservation

} from "../services/lockService.js";

export const getActiveLocks = async (req, res) => {

    try {

        const locks = await ProductLock.find({

            status: "ACTIVE"

        })

        .populate("productId", "name")

        .populate("userId", "name email")

        .sort({

            expiresAt: 1

        });

        res.json(locks);

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

export const releaseLock = async (req, res) => {

    try {

        await releaseReservation(req.params.id);

        res.json({

            success: true,

            message: "Reservation Released"

        });

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};
import cron from "node-cron";

import ProductLock from "../models/ProductLock.js";

import { releaseReservation }
from "../services/lockService.js";

cron.schedule("* * * * *", async () => {

    console.log("Checking expired locks...");

    const locks = await ProductLock.find({

        status: "ACTIVE",

        expiresAt: {
            $lt: new Date(),
        },

    });

    for (const lock of locks) {

        await releaseReservation(lock._id);

    }

});
import Order from "../models/Order.js";
import { getIO } from "../socket/socket.js";

/*
------------------------------------
Get Assigned Orders
GET /api/delivery/orders
------------------------------------
*/

export const getAssignedOrders = async (req, res) => {

    try {

        const orders = await Order.find({

            driverId: req.user._id,

            status: {
                $in: [
                    "Confirmed",
                    "Packed",
                    "Out For Delivery"
                ]
            }

        })

        .populate("userId", "name email phone")

        .populate("items.productId", "name image")

        .sort({ createdAt: -1 });

        res.status(200).json(orders);

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


/*
------------------------------------
Accept Order
PUT /api/delivery/orders/:id/accept
------------------------------------
*/

export const acceptOrder = async (req, res) => {

    try {

        const order = await Order.findById(req.params.id);

        if (!order) {

            return res.status(404).json({

                success: false,

                message: "Order not found"

            });

        }

        order.status = "Out For Delivery";

        order.acceptedAt = new Date();

        await order.save();

        const io = getIO();

        io.emit("orderUpdated", order);

        io.emit("dashboardRefresh");

        res.json({

            success: true,

            message: "Order Accepted",

            order

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


/*
------------------------------------
Update Delivery Status
PUT /api/delivery/orders/:id/status
------------------------------------
*/

export const updateDeliveryStatus = async (req, res) => {

    try {

        const { status } = req.body;

        const order = await Order.findById(req.params.id);

        if (!order) {

            return res.status(404).json({

                success: false,

                message: "Order not found"

            });

        }

        order.status = status;

        if (status === "Delivered") {

            order.deliveredAt = new Date();

        }

        await order.save();

        const io = getIO();

        io.emit("orderUpdated", order);

        io.emit("dashboardRefresh");

        res.json({

            success: true,

            message: "Status Updated",

            order

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


/*
------------------------------------
Delivery History
GET /api/delivery/history
------------------------------------
*/

export const getDeliveryHistory = async (req, res) => {

    try {

        const orders = await Order.find({

            driverId: req.user._id,

            status: "Delivered"

        })

        .populate("userId", "name")

        .sort({

            deliveredAt: -1

        });

        res.json(orders);

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};
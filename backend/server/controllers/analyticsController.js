import Order from "../models/Order.js";
import Product from "../models/Product.js";
import User from "../models/User.js";
import ProductLock from "../models/ProductLock.js";

/*
=================================================
GET /api/admin/analytics
=================================================
*/

export const getAnalytics = async (req, res) => {

    try {

        /* -----------------------------
            Dashboard Cards
        ------------------------------ */

        const totalProducts =
            await Product.countDocuments({
                isDeleted: false
            });

        const totalCustomers =
            await User.countDocuments({
                role: "customer"
            });

        const activeLocks =
            await ProductLock.countDocuments({
                status: "ACTIVE"
            });

        const lowStock =
            await Product.countDocuments({
                availableStock: {
                    $lt: 10
                }
            });

        /* -----------------------------
            Today's Revenue
        ------------------------------ */

        const today = new Date();

        today.setHours(0,0,0,0);

        const revenueTodayResult =
            await Order.aggregate([

                {
                    $match:{
                        createdAt:{
                            $gte:today
                        }
                    }
                },

                {
                    $group:{
                        _id:null,
                        revenue:{
                            $sum:"$totalAmount"
                        },
                        orders:{
                            $sum:1
                        }
                    }
                }

            ]);

        const todayRevenue =
            revenueTodayResult.length
                ? revenueTodayResult[0].revenue
                : 0;

        const todayOrders =
            revenueTodayResult.length
                ? revenueTodayResult[0].orders
                : 0;

        /* -----------------------------
            Weekly Revenue
        ------------------------------ */

        const weeklyRevenue =
            await Order.aggregate([

                {
                    $group:{
                        _id:{
                            $dayOfWeek:"$createdAt"
                        },
                        revenue:{
                            $sum:"$totalAmount"
                        }
                    }
                },

                {
                    $sort:{
                        _id:1
                    }
                }

            ]);

        /* -----------------------------
            Monthly Revenue
        ------------------------------ */

        const monthlyRevenue =
            await Order.aggregate([

                {
                    $group:{
                        _id:{
                            $month:"$createdAt"
                        },
                        revenue:{
                            $sum:"$totalAmount"
                        }
                    }
                },

                {
                    $sort:{
                        _id:1
                    }
                }

            ]);

        /* -----------------------------
            Category Sales
        ------------------------------ */

        const categorySales =
            await Product.aggregate([

                {
                    $group:{
                        _id:"$category",
                        total:{
                            $sum:1
                        }
                    }
                }

            ]);

        /* -----------------------------
            Top Selling Products
        ------------------------------ */

        const topProducts =
            await Order.aggregate([

                {
                    $unwind:"$items"
                },

                {
                    $group:{

                        _id:"$items.productId",

                        sold:{

                            $sum:"$items.quantity"

                        }

                    }

                },

                {

                    $sort:{

                        sold:-1

                    }

                },

                {

                    $limit:5

                },

                {

                    $lookup:{

                        from:"products",

                        localField:"_id",

                        foreignField:"_id",

                        as:"product"

                    }

                },

                {

                    $unwind:"$product"

                }

            ]);

        /* -----------------------------
            Customer Growth
        ------------------------------ */

        const customerGrowth =
            await User.aggregate([

                {

                    $match:{

                        role:"customer"

                    }

                },

                {

                    $group:{

                        _id:{

                            $month:"$createdAt"

                        },

                        customers:{

                            $sum:1

                        }

                    }

                },

                {

                    $sort:{

                        _id:1

                    }

                }

            ]);

        /* -----------------------------
            Delivery Performance
        ------------------------------ */

        const deliveryStats =
            await Order.aggregate([

                {

                    $group:{

                        _id:"$status",

                        total:{

                            $sum:1

                        }

                    }

                }

            ]);

        /* -----------------------------
            Recent Orders
        ------------------------------ */

        const recentOrders =
            await Order.find()

            .populate("userId","name")

            .sort({

                createdAt:-1

            })

            .limit(5);

        /* -----------------------------
            Low Stock Products
        ------------------------------ */

        const lowStockProducts =
            await Product.find({

                availableStock:{

                    $lt:10

                }

            })

            .sort({

                availableStock:1

            });

        /* -----------------------------
            Active Reservations
        ------------------------------ */

        const activeReservations =
            await ProductLock.find({

                status:"ACTIVE"

            })

            .populate("productId","name")

            .populate("userId","name")

            .sort({

                expiresAt:1

            });

        res.status(200).json({

            statistics:{

                todayRevenue,

                todayOrders,

                totalProducts,

                totalCustomers,

                lowStock,

                activeLocks

            },

            weeklyRevenue,

            monthlyRevenue,

            categorySales,

            topProducts,

            customerGrowth,

            deliveryStats,

            recentOrders,

            lowStockProducts,

            activeReservations

        });

    }

    catch(error){

        console.error(error);

        res.status(500).json({

            success:false,

            message:error.message

        });

    }

};
import Product from "../models/Product.js";
import Order from "../models/Order.js";
import User from "../models/User.js";
import ProductLock from "../models/ProductLock.js";

export const getDashboard = async (req, res) => {

    try {

        const today = new Date();

        today.setHours(0,0,0,0);

        const ordersToday = await Order.countDocuments({

            createdAt:{

                $gte:today

            }

        });

        const revenueResult = await Order.aggregate([

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

                    totalRevenue:{

                        $sum:"$totalAmount"

                    }

                }

            }

        ]);

        const revenueToday =
            revenueResult.length > 0
            ? revenueResult[0].totalRevenue
            : 0;

        const customers =
            await User.countDocuments({

                role:"customer"

            });

        const products =
            await Product.countDocuments();

        const activeLocks =
            await ProductLock.countDocuments({

                status:"ACTIVE"

            });

        const lowStock =
            await Product.countDocuments({

                availableStock:{

                    $lt:10

                }

            });

        const recentOrders =
            await Order.find()

            .sort({

                createdAt:-1

            })

            .limit(5)

            .populate("userId","name");

        const lowStockProducts =
            await Product.find({

                availableStock:{

                    $lt:10

                }

            });

        const activeReservations =
            await ProductLock.find({

                status:"ACTIVE"

            })

            .populate("productId","name")

            .populate("userId","name")

            .sort({

                expiresAt:1

            });

        res.json({

            statistics:{

                revenueToday,

                ordersToday,

                customers,

                products,

                lowStock,

                activeLocks

            },

            recentOrders,

            lowStockProducts,

            activeReservations

        });

    }

    catch(error){

        res.status(500).json({

            message:error.message

        });

    }

};
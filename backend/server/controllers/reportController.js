import Order from "../models/Order.js";
import Product from "../models/Product.js";
import InventoryLog from "../models/InventoryLog.js";
import AuditLog from "../models/AuditLog.js";

/*
=========================================================
Sales Report
GET /api/admin/reports/sales
=========================================================
*/

export const getSalesReport = async (req, res) => {

    try {

        const orders = await Order.find()
            .populate("userId", "name")
            .sort({ createdAt: -1 });

        const totalRevenue = orders.reduce(
            (sum, order) => sum + order.totalAmount,
            0
        );

        res.json({
            success: true,
            totalOrders: orders.length,
            totalRevenue,
            orders
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
=========================================================
Inventory Report
=========================================================
*/

export const getInventoryReport = async (req, res) => {

    try {

        const products = await Product.find({
            isDeleted: false
        }).sort({ category: 1, name: 1 });

        res.json({
            success: true,
            totalProducts: products.length,
            products
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
=========================================================
Inventory Log Report
=========================================================
*/

export const getInventoryLogReport = async (req, res) => {

    try {

        const logs = await InventoryLog.find()

            .populate("adminId", "name")

            .populate("productId", "name")

            .sort({ createdAt: -1 });

        res.json({
            success: true,
            totalLogs: logs.length,
            logs
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
=========================================================
Audit Report
=========================================================
*/

export const getAuditReport = async (req, res) => {

    try {

        const audits = await AuditLog.find()

            .populate("adminId", "name")

            .sort({ createdAt: -1 });

        res.json({
            success: true,
            totalRecords: audits.length,
            audits
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
=========================================================
Order Report
=========================================================
*/

export const getOrderReport = async (req, res) => {

    try {

        const orders = await Order.find()

            .populate("userId", "name")

            .populate("driverId", "name")

            .sort({ createdAt: -1 });

        res.json({
            success: true,
            totalOrders: orders.length,
            orders
        });

    }

    catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};
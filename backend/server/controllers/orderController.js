import mongoose from "mongoose";

import Cart from "../models/Cart.js";
import Order from "../models/Order.js";
import ProductLock from "../models/ProductLock.js";
import InventoryLog from "../models/InventoryLog.js";

import Product from "../models/Product.js";

import { getIO } from "../socket/socket.js";

// Place Order
export const placeOrder = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const userId = req.user._id;

    const { shippingAddress, paymentMethod } = req.body;

    const cart = await Cart.findOne({ userId })
      .populate("items.productId")
      .session(session);

    if (!cart || cart.items.length === 0) {
      throw new Error("Cart Empty");
    }

    const activeLocks = await ProductLock.find({
      userId,
      status: "ACTIVE",
    }).session(session);

    let subtotal = 0;

    const orderItems = [];

    for (const item of cart.items) {
      subtotal += item.productId.price * item.quantity;

      orderItems.push({
        productId: item.productId._id,
        quantity: item.quantity,
        price: item.productId.price,
      });
    }

    const deliveryCharge = subtotal > 500 ? 0 : 40;

    const discount = subtotal > 1000 ? 100 : 0;

    const totalAmount = subtotal + deliveryCharge - discount;

    // Complete Every Lock
    for (const lock of activeLocks) {
      const product = await Product.findById(lock.productId).session(session);

      if (!product) throw new Error("Product Missing");

      product.stock -= lock.quantity;

      product.reservedStock -= lock.quantity;

      product.availableStock = product.stock - product.reservedStock;

      await product.save({ session });

      lock.status = "COMPLETED";

      await lock.save({ session });

      await InventoryLog.create(
        [
          {
            adminId: null,
            productId: product._id,
            oldStock: product.stock + lock.quantity,
            newStock: product.stock,
            reason: "Customer Purchase",
          },
        ],
        { session }
      );
    }

    const order = await Order.create(
      [
        {
          userId,
          items: orderItems,
          shippingAddress,
          paymentMethod,
          subtotal,
          deliveryCharge,
          discount,
          totalAmount,
          status: "Pending",
        },
      ],
      { session }
    );

    cart.items = [];

    await cart.save({ session });

    await session.commitTransaction();

    session.endSession();

    // SOCKET EVENTS
    const io = getIO();

    io.emit("newOrder", order[0]);

    io.emit("inventoryChanged");

    io.emit("dashboardRefresh");

    res.status(201).json({
      success: true,
      message: "Order Placed Successfully",
      order: order[0],
    });
  } catch (error) {
    await session.abortTransaction();

    session.endSession();

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get My Orders (customer)
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id })
      .populate("items.productId", "name image price")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update Order Status (admin)
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const validStatuses = [
      "Pending",
      "Confirmed",
      "Packed",
      "Out For Delivery",
      "Delivered",
      "Cancelled",
    ];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate("userId", "name email");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const io = getIO();

    io.emit("orderStatusUpdated", {
      orderId: order._id,
      status: order.status,
      userId: order.userId._id,
    });

    io.emit("dashboardRefresh");

    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get All Orders (admin)
export const getAllOrders = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const status = req.query.status || "";

    const query = {};
    if (status) query.status = status;

    const total = await Order.countDocuments(query);

    const orders = await Order.find(query)
      .populate("userId", "name email phone")
      .populate("items.productId", "name image price")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({ orders, total, page, totalPages: Math.ceil(total / limit) });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
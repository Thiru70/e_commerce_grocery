import mongoose from "mongoose";

import Product from "../models/Product.js";
import ProductLock from "../models/ProductLock.js";
import Cart from "../models/Cart.js";

import { getIO } from "../socket/socket.js";

/*
    Reserve Product
*/
export const reserveProduct = async (productId, userId, quantity) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const product = await Product.findById(productId).session(session);

    if (!product) throw new Error("Product not found");

    if (product.availableStock < quantity)
      throw new Error("Product Out Of Stock");

    product.reservedStock += quantity;

    product.availableStock = product.stock - product.reservedStock;

    await product.save({ session });

    const expiresAt = new Date(Date.now() + product.lockDuration * 60 * 1000);

    const lock = await ProductLock.create(
      [{ productId, userId, quantity, expiresAt }],
      { session }
    );

    let cart = await Cart.findOne({ userId }).session(session);

    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    cart.items.push({ productId, quantity, locked: true, expiresAt });

    await cart.save({ session });

    await session.commitTransaction();

    session.endSession();

    const io = getIO();

    io.emit("inventoryUpdated", {
      productId,
      stock: product.stock,
      reservedStock: product.reservedStock,
      availableStock: product.availableStock,
    });

    io.emit("lockCreated", { productId, userId, expiresAt });

    return { success: true, message: "Product Reserved", lock: lock[0] };
  } catch (error) {
    await session.abortTransaction();

    session.endSession();

    throw error;
  }
};

/*
    Release Reservation
*/

export const releaseReservation = async (lockId) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const lock = await ProductLock.findById(lockId).session(session);

    if (!lock) throw new Error("Lock not found");

    if (lock.status !== "ACTIVE") {
      await session.commitTransaction();
      session.endSession();
      return;
    }

    const product = await Product.findById(lock.productId).session(session);

    product.reservedStock -= lock.quantity;

    product.availableStock = product.stock - product.reservedStock;

    await product.save({ session });

    lock.status = "EXPIRED";

    await lock.save({ session });

    await Cart.updateOne(
      { userId: lock.userId },
      { $pull: { items: { productId: lock.productId } } },
      { session }
    );

    await session.commitTransaction();

    session.endSession();

    const io = getIO();

    io.emit("inventoryUpdated", {
      productId: product._id,
      stock: product.stock,
      reservedStock: product.reservedStock,
      availableStock: product.availableStock,
    });

    io.emit("lockExpired", { lockId, productId: product._id });
  } catch (error) {
    await session.abortTransaction();

    session.endSession();

    throw error;
  }
};

/*
    Complete Reservation
*/

export const completeReservation = async (lockId) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const lock = await ProductLock.findById(lockId).session(session);

    if (!lock) throw new Error("Lock Not Found");

    const product = await Product.findById(lock.productId).session(session);

    product.stock -= lock.quantity;

    product.reservedStock -= lock.quantity;

    product.availableStock = product.stock - product.reservedStock;

    await product.save({ session });

    lock.status = "COMPLETED";

    await lock.save({ session });

    await session.commitTransaction();

    session.endSession();

    const io = getIO();

    io.emit("inventoryUpdated", {
      productId: product._id,
      stock: product.stock,
      reservedStock: product.reservedStock,
      availableStock: product.availableStock,
    });

    io.emit("orderCompleted", { productId: product._id });
  } catch (error) {
    await session.abortTransaction();

    session.endSession();

    throw error;
  }
};

/*
    Extend Reservation
*/

export const extendReservation = async (lockId, minutes = 7) => {
  const lock = await ProductLock.findById(lockId);

  if (!lock) throw new Error("Reservation Not Found");

  lock.expiresAt = new Date(Date.now() + minutes * 60000);

  await lock.save();

  getIO().emit("lockExtended", { lockId, expiresAt: lock.expiresAt });

  return lock;
};
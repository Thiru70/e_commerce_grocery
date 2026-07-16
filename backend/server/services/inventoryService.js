import Product from "../models/Product.js";
import InventoryLog from "../models/InventoryLog.js";

export const refillInventory = async (
  adminId,
  productId,
  quantity,
  reason
) => {

  const product = await Product.findById(productId);

  if (!product)
    throw new Error("Product not found");

  const oldStock = product.stock;

  product.stock += quantity;

  product.availableStock =
    product.stock - product.reservedStock;

  await product.save();

  await InventoryLog.create({

    adminId,

    productId,

    oldStock,

    newStock: product.stock,

    reason,

  });

  return product;

};

export const getInventoryLogs = async () => {

  return await InventoryLog.find()

    .populate("productId")

    .populate("adminId")

    .sort({
      createdAt: -1,
    });

};
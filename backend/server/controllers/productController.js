import Product from "../models/Product.js";
import InventoryLog from "../models/InventoryLog.js";

import { getIO } from "../socket/socket.js";

// Get Products (with pagination, search, category filter)
export const getProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";
    const category = req.query.category || "";

    const query = { isDeleted: false };

    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    if (category) {
      query.category = category;
    }

    const total = await Product.countDocuments(query);
    const products = await Product.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({
      products,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Add Product
export const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      category,
      price,
      oldPrice,
      stock,
      weight,
      rating,
      lockEnabled,
      lockDuration,
    } = req.body;

    const image = req.file?.path || req.body.image || "";

    const product = await Product.create({
      name,
      description,
      category,
      price: Number(price),
      oldPrice: oldPrice ? Number(oldPrice) : undefined,
      stock: Number(stock) || 0,
      availableStock: Number(stock) || 0,
      weight,
      rating: rating ? Number(rating) : 5,
      lockEnabled: lockEnabled === "true" || lockEnabled === true,
      lockDuration: lockDuration ? Number(lockDuration) : 7,
      image,
    });

    const io = getIO();
    io.emit("productAdded", product);
    io.emit("dashboardRefresh");

    res.status(201).json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update Product
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const updates = { ...req.body };

    if (req.file?.path) {
      updates.image = req.file.path;
    }

    if (updates.price) updates.price = Number(updates.price);
    if (updates.oldPrice) updates.oldPrice = Number(updates.oldPrice);
    if (updates.stock !== undefined) {
      updates.stock = Number(updates.stock);
    }
    if (updates.rating) updates.rating = Number(updates.rating);
    if (updates.lockDuration) updates.lockDuration = Number(updates.lockDuration);

    const product = await Product.findByIdAndUpdate(id, updates, { new: true });

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    // Recalculate available stock
    product.availableStock = product.stock - product.reservedStock;
    await product.save();

    const io = getIO();
    io.emit("productUpdated", product);
    io.emit("inventoryChanged");

    res.json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Soft Delete Product
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    const io = getIO();
    io.emit("productDeleted", { productId: id });
    io.emit("dashboardRefresh");

    res.json({ success: true, message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Refill Inventory
export const refillInventory = async (req, res) => {
  try {
    const { productId } = req.params;

    const { quantity, reason } = req.body;

    if (!quantity || quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid quantity",
      });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const oldStock = product.stock;

    product.stock += Number(quantity);

    product.availableStock = product.stock - product.reservedStock;

    await product.save();

    await InventoryLog.create({
      adminId: req.user._id,
      productId: product._id,
      oldStock,
      newStock: product.stock,
      reason,
    });

    const io = getIO();

    io.emit("inventoryChanged", {
      productId: product._id,
      stock: product.stock,
      reservedStock: product.reservedStock,
      availableStock: product.availableStock,
    });

    io.emit("dashboardRefresh");

    res.status(200).json({
      success: true,
      message: "Inventory Updated Successfully",
      product,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get public products (for customers)
export const getPublicProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const search = req.query.search || "";
    const category = req.query.category || "";

    const query = { isDeleted: false, availableStock: { $gt: 0 } };

    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    if (category) {
      query.category = category;
    }

    const total = await Product.countDocuments(query);
    const products = await Product.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({
      products,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single product
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findOne({
      _id: req.params.id,
      isDeleted: false,
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
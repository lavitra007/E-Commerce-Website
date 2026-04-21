const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { admin } = require("../middleware/adminMiddleware");
const User = require("../models/User");
const Product = require("../models/Product");
const AdminStat = require("../models/AdminStat");
const { upload } = require("../config/cloudinary");

// @route   GET /api/admin/users
// @desc    Get all users (Admin only)
// @access  Private/Admin
router.get("/users", protect, admin, async (req, res) => {
  try {
    const users = await User.find({}).select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error fetching users" });
  }
});

// @route   DELETE /api/admin/users/:id
// @desc    Delete a user (Admin only)
// @access  Private/Admin
router.delete("/users/:id", protect, admin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      await User.deleteOne({ _id: req.params.id });
      res.json({ message: "User removed" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error deleting user" });
  }
});

// @route   GET /api/admin/stats
// @desc    Get basic platform stats (Admin only)
// @access  Private/Admin
router.get("/stats", protect, admin, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();
    
    let adminStat = await AdminStat.findOne();
    if (!adminStat) {
      adminStat = await AdminStat.create({ activeOrders: 0, revenue: 0 });
    }
    
    res.json({ totalUsers, activeOrders: adminStat.activeOrders, revenue: adminStat.revenue, totalProducts });
  } catch (error) {
    res.status(500).json({ message: "Server error fetching stats" });
  }
});

// @route   PUT /api/admin/stats
// @desc    Update platform metrics (Admin only)
// @access  Private/Admin
router.put("/stats", protect, admin, async (req, res) => {
  try {
    const { activeOrders, revenue } = req.body;
    let adminStat = await AdminStat.findOne();
    if (!adminStat) {
      adminStat = new AdminStat();
    }
    if (activeOrders !== undefined) adminStat.activeOrders = Number(activeOrders);
    if (revenue !== undefined) adminStat.revenue = Number(revenue);
    
    await adminStat.save();
    res.json({ activeOrders: adminStat.activeOrders, revenue: adminStat.revenue });
  } catch (error) {
    res.status(500).json({ message: "Server error updating stats" });
  }
});

// @route   POST /api/admin/products
// @desc    Create a product (Admin only)
// @access  Private/Admin
router.post("/products", protect, admin, upload.single("image"), async (req, res) => {
  try {
    const { name, price, description, category, stock } = req.body;
    const imageUrl = req.file ? req.file.path : null;

    if (!imageUrl) {
      return res.status(400).json({ message: "Image is required" });
    }

    const product = new Product({
      name,
      price,
      description,
      category,
      stock,
      image: imageUrl,
      images: [imageUrl]
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error creating product" });
  }
});

// @route   DELETE /api/admin/products/:id
// @desc    Delete a product (Admin only)
// @access  Private/Admin
router.delete("/products/:id", protect, admin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      await Product.deleteOne({ _id: req.params.id });
      res.json({ message: "Product removed" });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error deleting product" });
  }
});

module.exports = router;

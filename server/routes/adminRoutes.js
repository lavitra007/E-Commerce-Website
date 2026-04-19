const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { admin } = require("../middleware/adminMiddleware");
const User = require("../models/User");
const Product = require("../models/Product");
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

// @route   GET /api/admin/stats
// @desc    Get basic platform stats (Admin only)
// @access  Private/Admin
router.get("/stats", protect, admin, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();
    res.json({ totalUsers, activeOrders: 15, revenue: 154000, totalProducts });
  } catch (error) {
    res.status(500).json({ message: "Server error fetching stats" });
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

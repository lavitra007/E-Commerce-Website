const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { admin } = require("../middleware/adminMiddleware");
const User = require("../models/User");

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
    res.json({ totalUsers, activeOrders: 15, revenue: 154000 });
  } catch (error) {
    res.status(500).json({ message: "Server error fetching stats" });
  }
});

module.exports = router;

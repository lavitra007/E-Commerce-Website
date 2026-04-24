const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Generate Token
const JWT_SECRET = process.env.JWT_SECRET || process.env.JWT_SECRET_KEY || "secret";
const ADMIN_SECRET = process.env.ADMIN_SECRET || process.env.ADMIN_SECRET_KEY;

const generateToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, {
    expiresIn: "1d"
  });
};

// Register
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, adminSecret } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    let role = "user";
    if (adminSecret && ADMIN_SECRET && adminSecret.trim() === ADMIN_SECRET.trim()) {
      role = "admin";
      console.log(`User ${email} registered with ADMIN privileges.`);
    }

    const user = await User.create({
      name,
      email,
      password,
      role
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id)
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login
exports.loginUser = async (req, res) => {
  try {
    const { email, password, adminSecret } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      // If a valid admin secret is provided, upgrade this user's role to admin
      if (adminSecret && ADMIN_SECRET && adminSecret.trim() === ADMIN_SECRET.trim()) {
        user.role = "admin";
        await user.save();
        console.log(`User ${email} upgraded to ADMIN during login.`);
      }

      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id)
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get User Profile
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        addresses: user.addresses
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update User Profile
exports.updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.name = req.body.name || user.name;
      user.phone = req.body.phone || user.phone;
      if (req.body.password) {
        user.password = req.body.password;
      }
      
      if (req.body.addresses) {
        user.addresses = req.body.addresses;
      }

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        phone: updatedUser.phone,
        addresses: updatedUser.addresses,
        token: generateToken(updatedUser._id) // issue new token just in case
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
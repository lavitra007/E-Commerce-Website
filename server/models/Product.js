const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: String,
    category: String,
    image: { type: String, required: true },
    images: [String],
    stock: { type: Number, required: true, default: 0 }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
const Product = require("../models/Product");

exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    next(error);
  }
};

exports.createProduct = async (req, res, next) => {
  try {
    const product = new Product(req.body);
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    next(error);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    console.log(`Updating product: ${req.params.id}`, req.body);
    const updateData = { ...req.body };
    delete updateData._id; // Prevent accidental ID modification
    
    const product = await Product.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!product) {
        console.log(`Product NOT FOUND: ${req.params.id}`);
        return res.status(404).json({ message: "Product not found in database" });
    }
    res.json(product);
  } catch (error) {
    console.error(`Error in updateProduct: ${error.message}`);
    next(error);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product removed" });
  } catch (error) {
    next(error);
  }
};
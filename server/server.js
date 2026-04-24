const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes"); 
const { errorHandler } = require("./middleware/errorMiddleware"); 

dotenv.config();
connectDB();

const app = express();

app.use(cors({
  origin: "*",
  credentials: true
}));
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("E-Commerce Backend Running (Updated April 24)");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes); 

// Error Middleware 
app.use(errorHandler); 

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
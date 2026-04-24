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
  origin: ["http://localhost:5173", "https://faroutluxuries.pages.dev"],
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

// Diagnostic 404 handler
app.use((req, res) => {
  console.log(`404 hit: ${req.method} ${req.url}`);
  res.status(404).json({ 
    message: `Endpoint ${req.url} not found on this server.`,
    debugInfo: {
      method: req.method,
      path: req.path,
      baseUrl: req.baseUrl,
      originalUrl: req.originalUrl
    }
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
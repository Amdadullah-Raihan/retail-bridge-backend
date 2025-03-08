// server.js
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");

// Load environment variables
dotenv.config();

// Import routes
// const salesRoutes = require("./modules/routes/sales");
// const customerRoutes = require("./modules/routes/customers");
// const inventoryRoutes = require("./modules/routes/inventory");
const authRoutes = require("./modules/user/routes/user.route");

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(morgan("dev"));

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
// app.use("/api/sales", salesRoutes);
// app.use("/api/customers", customerRoutes);
// app.use("/api/inventory", inventoryRoutes);
app.use("/api/auth", authRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

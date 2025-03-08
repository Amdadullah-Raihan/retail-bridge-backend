// routes/user.route.js
const express = require("express");
const { registerUser, loginUser } = require("../controllers/user.controller");

const router = express.Router();

// Register new user
router.post("/register", registerUser);

// Login user
router.post("/login", loginUser);

module.exports = router;

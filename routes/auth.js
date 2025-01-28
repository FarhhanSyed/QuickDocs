const express = require("express");
const authController = require("../controllers/auth");

const router = express.Router();

// Signup route
router.post("/signup", authController.signup);

// Login route
router.post("/login", authController.login);

// Logout route
router.post("/logout", authController.logout);

// Request password reset route
router.post("/request-password-reset", authController.requestPasswordReset);

// Reset password route
router.post("/reset-password/:token", authController.resetPassword);

module.exports = router;
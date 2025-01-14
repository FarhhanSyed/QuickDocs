const express = require("express");
const { signup, updateProfile } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");
const upload = require("../utils/multer");

const router = express.Router();

// Signup route
router.post("/signup", signup);

// Update profile route
router.put(
  "/update-profile",
  protect,
  upload.single("profileImage"),
  updateProfile
);

module.exports = router;

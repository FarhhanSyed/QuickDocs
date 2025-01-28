const express = require("express");
const userController = require("../controllers/user");
const authenticateUser = require("../middlewares/auth");

const router = express.Router();

// Define routes
router.put("/profile", authenticateUser, userController.updateProfile);
router.put("/password", authenticateUser, userController.updatePassword);

module.exports = router;

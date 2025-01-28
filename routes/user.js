const express = require('express');
const userController = require('../controllers/user');

const router = express.Router();

// Define routes
router.put('/profile', userController.updateProfile);
router.put('/password', userController.updatePassword);

module.exports = router;

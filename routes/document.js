const express = require("express");
const documentController = require("../controllers/document");
const authenticateUser = require("../middlewares/auth");

const router = express.Router();

// Route to create a new document
router.post("/create", authenticateUser, documentController.createDocument);

// Route to get all documents for a user
router.get("/", authenticateUser, documentController.getDocuments);

module.exports = router;

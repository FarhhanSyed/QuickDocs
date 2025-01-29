const express = require("express");
const documentController = require("../controllers/document");
const authenticateUser = require("../middlewares/auth");
const documentShareController = require("../controllers/documentShare");

const router = express.Router();

// Route to create a new document
router.post("/create", authenticateUser, documentController.createDocument);

// Route to get all documents for a user
router.get("/", authenticateUser, documentController.getDocuments);

// Route to validate access to shared documents
router.post("/validate-access", documentShareController.validateAccess);

// Route to generate share token for multiple documents
router.post(
  "/generate-share-token",
  authenticateUser,
  documentShareController.generateShareTokenForMultipleDocuments
);

module.exports = router;

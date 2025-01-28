const multer = require("multer");
const path = require("path");
const Document = require("../models/document");
const User = require("../models/user");

// Multer setup for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "data/files"); // Save files to the "data/files" folder
  },
  filename: (req, file, cb) => {
    // Ensure the filename is unique by appending the current timestamp
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage });

// Controller: Create Document (with file upload)
exports.createDocument = [
  upload.single("file"), // Use .single for a single file upload (field name is 'file')
  async (req, res) => {
    const { name, metadata } = req.body;
    const userId = req.user.id;

    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Ensure the file has been uploaded
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const parsedMetadata =
        typeof metadata === "string" ? JSON.parse(metadata) : metadata;

      // Create the document with the path to the uploaded file
      const document = await Document.create({
        user: userId,
        name,
        metadata: parsedMetadata,
        path: req.file.path, // Store the file path (relative to the root)
      });

      await document.save();

      res.status(201).json({
        message: "Document created successfully",
        document,
      });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  },
];

// Controller: Get Documents
exports.getDocuments = async (req, res) => {
  const userId = req.user.id;

  try {
    const documents = await Document.find({ user: userId });

    res.status(200).json({
      message: "Documents fetched successfully",
      documents,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: [true, "Document name is required"],
      trim: true,
      maxlength: [100, "Document name must be less than 100 characters"],
    },
    metadata: {
      type: Map,
      of: String, // Key-value pairs for additional metadata
      default: {},
    },
    path: {
      type: String,
      required: [true, "File path is required"],
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    shareToken: String,
    shareTokenExpiry: Date,
    pin: String,
    accessMode: {
      type: String,
      enum: ['read-only', 'print-only'],
      default: 'read-only'
    },
    accessLogs: [{
      user: String,
      ipAddress: String,
      accessTime: Date,
      accessMode: String
    }]
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const Document = mongoose.model("Document", documentSchema);

module.exports = Document;

// controllers/documentShare.js
const jwt = require("jsonwebtoken");
const Document = require("../models/document");
const nodemailer = require("nodemailer");

exports.generateShareToken = async (req, res) => {
  const { documentId, accessMode, pin } = req.body;

  try {
    const document = await Document.findById(documentId);
    if (!document) {
      return res.status(404).json({ message: "Document not found" });
    }

    // Generate JWT token with document details
    const token = jwt.sign(
      {
        documentId,
        accessMode,
        userId: req.user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "10m" }
    );

    // Update document with sharing details
    document.shareToken = token;
    document.shareTokenExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 mins
    document.pin = pin;
    document.accessMode = accessMode;
    await document.save();

    res.json({
      token,
      shareUrl: `${process.env.FRONTEND_URL}/shared-document/${token}`,
    });
  } catch (error) {
    res.status(500).json({ message: "Error generating share token", error });
  }
};

exports.validateAccess = async (req, res) => {
  const { token, pin } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const document = await Document.findById(decoded.documentId);

    if (!document || document.pin !== pin) {
      return res.status(401).json({ message: "Invalid token or PIN" });
    }

    if (Date.now() > document.shareTokenExpiry) {
      return res.status(401).json({ message: "Share link expired" });
    }

    // Log access
    document.accessLogs.push({
      user: req.ip,
      ipAddress: req.ip,
      accessTime: new Date(),
      accessMode: document.accessMode,
    });
    await document.save();

    // Send notification to document owner
    const owner = await User.findById(document.user);
    if (owner) {
      await sendAccessNotification(owner.email, document);
    }

    res.json({
      document: {
        _id: document._id,
        name: document.name,
        accessMode: document.accessMode,
        path: document.path,
      },
    });
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

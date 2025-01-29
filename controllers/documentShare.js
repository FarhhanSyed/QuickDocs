// controllers/documentShare.js
const jwt = require("jsonwebtoken");
const Document = require("../models/document");
const nodemailer = require("nodemailer");
const QRCode = require("qrcode");
const User = require("../models/user");

const sendAccessNotification = async (email, documents) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Document Access Notification",
    text: `The following documents were accessed:\n\n${documents
      .map((doc) => `- ${doc.name}`)
      .join("\n")}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Access notification sent");
  } catch (error) {
    console.error("Error sending access notification", error);
  }
};

exports.validateAccess = async (req, res) => {
  const { token, pin } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const documents = await Document.find({
      _id: { $in: decoded.documentIds },
    });

    if (documents.length !== decoded.documentIds.length) {
      return res.status(401).json({ message: "Invalid token or PIN" });
    }

    for (const document of documents) {
      if (document.pin !== pin || Date.now() > document.shareTokenExpiry) {
        return res
          .status(401)
          .json({ message: "Invalid token or PIN or Share link expired" });
      }

      // Log access
      document.accessLogs.push({
        user: req.ip,
        ipAddress: req.ip,
        accessTime: new Date(),
        accessMode: document.accessMode,
      });
      await document.save();
    }

    // Send notification to document owner
    const owner = await User.findById(documents[0].user);
    if (owner) {
      await sendAccessNotification(owner.email, documents);
    }

    res.json({
      documents: documents.map((document) => ({
        _id: document._id,
        name: document.name,
        accessMode: document.accessMode,
        path: document.path,
      })),
    });
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

exports.generateShareTokenForMultipleDocuments = async (req, res) => {
  const { documentIds, accessMode, pin } = req.body;

  try {
    const documents = await Document.find({ _id: { $in: documentIds } });
    if (documents.length !== documentIds.length) {
      return res
        .status(404)
        .json({ message: "One or more documents not found" });
    }

    // Generate JWT token with document details
    const token = jwt.sign(
      {
        documentIds,
        accessMode,
        userId: req.user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "10m" }
    );

    // Update each document with sharing details
    const shareTokenExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 mins
    await Document.updateMany(
      { _id: { $in: documentIds } },
      {
        shareToken: token,
        shareTokenExpiry,
        pin,
        accessMode,
      }
    );

    // Generate QR code
    const shareUrl = `${process.env.FRONTEND_URL}/shared-documents/${token}`;
    const qrCode = await QRCode.toDataURL(shareUrl);

    res.json({
      token,
      shareUrl,
      qrCode,
    });
  } catch (error) {
    res.status(500).json({ message: "Error generating share token", error });
  }
};

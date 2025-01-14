const User = require("../models/user");
const Employee = require("../models/employee");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

// Shared function to get the model
const getModelByType = (type) => {
  if (type === "employee") return Employee;
  if (type === "user") return User;
  throw new Error("Invalid type specified");
};

// Request OTP
exports.requestOTP = async (req, res) => {
  const { email } = req.body;
  const { type } = req.query;

  try {
    const Model = getModelByType(type);
    let entity = await Model.findOne({ email });
    if (!entity) {
      entity = new Model({ email, name: "New User" }); // Default name
    }

    const otp = crypto.randomInt(100000, 999999).toString();
    entity.otp = otp;
    entity.otpExpiry = Date.now() + 10 * 60 * 1000; // Valid for 10 minutes
    await entity.save();

    // Send OTP
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your OTP for Authentication",
      text: `Your OTP is: ${otp}`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Verify OTP and Login
exports.verifyOTP = async (req, res) => {
  const { email, otp } = req.body;
  const { type } = req.query;

  try {
    const Model = getModelByType(type);
    const entity = await Model.findOne({ email });

    if (!entity || entity.otp !== otp || entity.otpExpiry < Date.now()) {
      return res.status(400).json({ error: "Invalid or expired OTP" });
    }

    // Clear OTP
    entity.otp = undefined;
    entity.otpExpiry = undefined;
    await entity.save();

    const token = jwt.sign({ id: entity._id, type }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(200).json({ message: "Logged in successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

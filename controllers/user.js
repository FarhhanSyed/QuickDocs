const User = require("../models/User");
const multer = require("multer");
const path = require("path");

// Multer setup for profile image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "data/profiles"); // Save files to the "data/profiles" folder
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage });

// Controller: Update Profile (Name and Profile Image)
exports.updateProfile = [
  upload.single("profileImage"), // Handling profile image upload
  async (req, res) => {
    const userId = req.user._id;
    const { name } = req.body;
    let profileImage = req.file ? req.file.path : null; // Use the uploaded file's path if present

    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Update user profile (name, profileImage)
      await user.updateProfile(name, profileImage);

      res.status(200).json({
        message: "Profile updated successfully",
        user,
      });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  },
];

// Controller: Update Password
exports.updatePassword = async (req, res) => {
  const userId = req.user._id;
  const { currentPassword, newPassword } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update password after verifying the current one
    await user.updatePassword(currentPassword, newPassword);

    res.status(200).json({
      message: "Password updated successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

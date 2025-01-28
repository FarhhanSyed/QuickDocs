const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Middleware to authenticate user
const authenticateUser = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: "Token is not valid" });
    }
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = authenticateUser;

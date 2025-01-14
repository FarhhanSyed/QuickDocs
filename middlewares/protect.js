const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Employee = require("../models/employee");

const getModelByType = (type) => {
  if (type === "employee") return Employee;
  if (type === "user") return User;
  throw new Error("Invalid type specified");
};

exports.protect = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: "Not authorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const Model = getModelByType(decoded.type);
    const entity = await Model.findById(decoded.id);

    if (!entity) {
      return res.status(401).json({ error: "Not authorized" });
    }

    req.user = entity; // Attach user or employee to request
    req.userType = decoded.type;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};

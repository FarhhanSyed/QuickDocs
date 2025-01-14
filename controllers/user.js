const User = require("../models/User");
const Employee = require("../models/Employee");

exports.signup = async (req, res) => {
  const { name, email, role } = req.body; // Role is required for employees
  const { type } = req.query;

  try {
    if (type === "user") {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: "User already exists" });
      }

      const user = new User({ name, email });
      await user.save();
      res.status(201).json({ message: "User registered successfully", user });
    } else if (type === "employee") {
      const existingEmployee = await Employee.findOne({ email });
      if (existingEmployee) {
        return res.status(400).json({ error: "Employee already exists" });
      }

      if (!role) {
        return res
          .status(400)
          .json({ error: "Role is required for employees" });
      }

      const employee = new Employee({ name, email, role });
      await employee.save();
      res
        .status(201)
        .json({ message: "Employee registered successfully", employee });
    } else {
      res.status(400).json({ error: "Invalid type specified" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateProfile = async (req, res) => {
  const { name } = req.body;
  const { type } = req.query;
  const profileImage = req.file
    ? `/uploads/profiles/${req.file.filename}`
    : null;

  try {
    let updatedEntity;

    if (type === "user") {
      updatedEntity = await User.findByIdAndUpdate(
        req.user._id,
        { name, profileImage },
        { new: true }
      );
    } else if (type === "employee") {
      updatedEntity = await Employee.findByIdAndUpdate(
        req.user._id,
        { name, profileImage },
        { new: true }
      );
    } else {
      return res.status(400).json({ error: "Invalid type specified" });
    }

    res
      .status(200)
      .json({ message: "Profile updated successfully", updatedEntity });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

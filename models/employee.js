const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const employeeSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    otp: { type: String },
    otpExpiry: { type: Date },
    role: { type: mongoose.Types.ObjectId, ref: "Role", required: true },
    profileImage: { type: String }, // Stores the path to the uploaded image
  },
  { timestamps: true }
);

module.exports = mongoose.model("Employee", employeeSchema);

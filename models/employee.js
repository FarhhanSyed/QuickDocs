const employeeSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: mongoose.Types.ObjectId, ref: "Role", required: true }, // Reference to Role
  },
  { timestamps: true }
);

module.exports = mongoose.model("Employee", employeeSchema);

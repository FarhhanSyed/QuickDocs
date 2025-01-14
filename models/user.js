const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Encrypted password
    documents: [{ type: mongoose.Types.ObjectId, ref: "Document" }], // List of documents owned by the user
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);

const roleSchema = new Schema({
  roleName: { type: String, required: true, unique: true }, // e.g., "EndUser", "HR", "Finance", "IT", etc.
  description: { type: String }, // Optional: Description of the role
  accessibleDocumentTypes: [
    { type: mongoose.Types.ObjectId, ref: "DocumentType" },
  ], // Document types the role can access
});

module.exports = mongoose.model("Role", roleSchema);

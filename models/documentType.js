const documentTypeSchema = new Schema({
  typeName: { type: String, required: true, unique: true }, // e.g., "Official", "Personal"
  description: { type: String }, // Optional: Description of the type
});

module.exports = mongoose.model("DocumentType", documentTypeSchema);

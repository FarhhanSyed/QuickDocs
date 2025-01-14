const documentSchema = new Schema(
  {
    title: { type: String, required: true },
    filePath: { type: String, required: true },
    owner: { type: mongoose.Types.ObjectId, ref: "User", required: true }, // Reference to User
    documentType: {
      type: mongoose.Types.ObjectId,
      ref: "DocumentType",
      required: true,
    }, // Reference to DocumentType
  },
  { timestamps: true }
);

module.exports = mongoose.model("Document", documentSchema);

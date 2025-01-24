const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {});
    console.log("Connection Successful");
  } catch (err) {
    console.error("Connection error", err);
  }
}

app.get("/", (req, res) => {
  res.send("root working");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  connectDB();
  console.log(`Server started on port ${PORT}`);
});

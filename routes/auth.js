const express = require("express");
const { protect } = require("../middlewares/protect");

const router = express.Router();

app.post("/request-otp", authController.requestOTP);
app.post("/verify-otp", authController.verifyOTP);

router.get("/me", protect, (req, res) => {
  res.status(200).json({
    user: req.user,
  });
});

module.exports = router;

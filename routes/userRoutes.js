const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const CommunityUserController = require("../controllers/CommunityUserController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/home", authMiddleware.authenticate, (req, res) => {
  res.send("Welcome to user's home");
});

module.exports = router;

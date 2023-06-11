const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const CommunityController = require("../controllers/CommunityController.js");

router.post("/login", authController.login);
router.post("/register", authController.register);
router.get("/communities", CommunityController.getAllCommunity);
router.get("/communities/:id", CommunityController.getCommunityDetail);

module.exports = router;

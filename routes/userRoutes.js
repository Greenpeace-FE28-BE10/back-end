const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const CommunityController = require("../controllers/CommunityController.js");
const CommunityUserController = require("../controllers/CommunityUserController");
const CommunityActivityController = require("../controllers/CommunityActivityController");

router.get("/home", authMiddleware.authenticate, (req, res) => {
  // res.send("Welcome to user's home");
  response = {
    success: true,
    status: "SUCCESS",
    message: "User's Authorized Homepage",
  };
  res.status(200).json(response);
});

router.get("/communities", authMiddleware.authenticate, CommunityController.getAllCommunity);
router.get("/communities/:id", authMiddleware.authenticate, CommunityController.getCommunityDetail);
router.post("/communities", authMiddleware.authenticate, CommunityController.createNewCommunity);
router.post("/communities/membership", authMiddleware.authenticate, CommunityUserController.createNewCommunityUser);
router.patch("/communities/:id", authMiddleware.authenticate, CommunityController.updateCommunity);
router.post("/communities/activity", CommunityActivityController.createNewActivity);
router.patch("/communities/activity/:id", CommunityActivityController.updateActivity);
router.delete("/communities/activity/:id", CommunityActivityController.deleteActivity);
module.exports = router;

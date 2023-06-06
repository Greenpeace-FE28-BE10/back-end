const express = require("express");
const CommunityController = require("../controllers/CommunityController.js");
const router = express.Router();

// CREATE POST
router.post("/", CommunityController.createNewCommunity);
router.get("/", CommunityController.getAllCommunity);
router.get("/:id", CommunityController.getCommunityDetail);
router.patch("/:id", CommunityController.updateCommunity);
router.delete("/:id", CommunityController.deleteCommunity);
module.exports = router;

const express = require("express");
const CommunityActivityController = require("../controllers/CommunityActivityController");
const router = express.Router();

router.post("/", CommunityActivityController.createNewActivity);
router.get("/:id", CommunityActivityController.getAllActivities);
router.patch("/:id", CommunityActivityController.updateActivity);
router.delete("/:id", CommunityActivityController.deleteActivity);
module.exports = router;

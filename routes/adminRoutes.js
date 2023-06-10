const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const CommunityUserController = require("../controllers/CommunityUserController");
const authMiddleware = require("../middleware/authMiddleware");

// router.get("/", authMiddleware.authenticate, authMiddleware.checkAdminRole, (req, res) => {
//   res.status(200).send("Dashboard Admin");
// });

router.post("/community-users", CommunityUserController.createNewCommunityUser);

module.exports = router;

const express = require("express");
const {
  getLeaderboard,
  getTopKCoders,
} = require("../controllers/leaderboardController");

const router = express.Router();

router.get("/", getLeaderboard);
router.get("/top", getTopKCoders);

module.exports = router;

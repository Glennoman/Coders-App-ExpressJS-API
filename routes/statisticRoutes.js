const express = require("express");
const {
  getSolvedChallengesStats,
  getTrendingCategories,
  getHeatmap,
} = require("../controllers/statisticController");
const { validateHeatmap } = require("../middleware/validators");

const router = express.Router();

router.get("/solved-challenges", getSolvedChallengesStats);
router.get("trending-categories", getTrendingCategories);
router.get("/heatmap", validateHeatmap, getHeatmap);

module.exports = router;

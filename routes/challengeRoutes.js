const express = require("express");
const {
  createChallenge,
  listOfChallenges,
  getChallengeId,
  listCategories,
  getChallengeById,
} = require("../controllers/challengeController");
const { validateChallengeCreation } = require("../middleware/validators");

const router = express.Router();

router.post("/", validateChallengeCreation, createChallenge);
router.get("/", listOfChallenges);
router.get("/:id", getChallengeById);
router.get("/categories", listCategories);

module.exports = router;

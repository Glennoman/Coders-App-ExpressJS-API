const express = require("express");
const {
  createChallenge,
  listOfChallenges,
  listCategories,
  getChallengeById,
} = require("../controllers/challengeController");
const { validateChallengeCreation } = require("../middleware/validators");

const router = express.Router();

router.post("/create", validateChallengeCreation, createChallenge);
router.get("/", listOfChallenges);
router.get("/:id", getChallengeById);
router.get("/categories", listCategories);

module.exports = router;

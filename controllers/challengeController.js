const { Challenge } = require("../models/Challenge");

// function to create a challenge
const createChallenge = async (req, res) => {
  try {
    const challengeData = req.body;
    const challenge = new Challenge(challengeData);
    await challenge.save();

    res
      .status(201)
      .json({ message: "Challenge created succesfully", challenge });
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Function to list all challenges and filtered by category
const listOfChallenges = async (req, res) => {
  try {
    const { category } = req.query;
    let challenges;

    if (category) {
      challenges = await Challenge.find({ category });
    } else {
      challenges = await Challenge.find();
    }

    res.json(challenges);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve challenges" });
  }
};

// Function to get a specific challenge by it's ID
const getChallengeById = async (req, res) => {
  try {
    const { id } = req.params;
    const challenge = await Challenge.findById(id);

    if (!challenge) {
      return res.status(404).json({ error: "Challenge not found" });
    }

    res.json(challenge);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve data" });
  }
};

// Function to list all unique categories
const listCategories = async (req, res) => {
  try {
    const categories = await Challenge.distinct("category");
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve categories" });
  }
};

module.exports = {
  createChallenge,
  listOfChallenges,
  getChallengeById,
  listCategories,
};

// Mock database for challeges and categories
const challenges = [];
const categories = new Set();

// function to create a challenge
const createChallenge = (req, res) => {
  const challenge = req.body;
  challenge.id = challenges.length + 1; // Simple ID
  challenges.push(challenge);
  categories.add(challenge.category); // Add category to set
  res.status(201).json({ message: "Challenge created succesfully", challenge });
};

// Function to list all challenges and filtered by category
const listOfChallenges = (req, res) => {
  const { category } = req.query;
  if (category) {
    const filteredChallenges = challenges.filter(
      (challenge) => challenge.category === category
    );
    res.json(filteredChallenges);
  } else {
    res.json(challenges);
  }
};

// Function to get a specific challenge by it's ID
const getChallengeById = (req, res) => {
  const { id } = req.params;
  const challenge = challenge.find(
    (challenge) => challenge.id === parseInt(id)
  );
  if (!challenge) {
    return res.status(404).json({ error: "Challenge not found" });
  }
  res.json(challenge);
};

// Function to list all categories
const listCategories = (req, res) => {
  res.json([...categories]);
};

module.exports = {
  createChallenge,
  listOfChallenges,
  getChallengeById,
  listCategories,
};

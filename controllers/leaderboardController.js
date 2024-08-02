// Mock databse for coder and their scores
const coders = [];

// Controller to get leaderboard
const getLeaderboard = (req, res) => {
  // Sort coders by score (descending order)
  const leaderboard = coders.sort((a, b) => b.score - a.score);
  res.json(leaderboard);
};

// Controller to get the top K coders
const getTopKCoders = (req, res) => {
  const { k } = req.query;
  // Sort coders by score (descending order and top K)
  const topKCoder = coders.sort((a, b) => b.score - a.score).slice(0, k);
  res.json(topKCoder);
};

module.exports = { getLeaderboard, getTopKCoders };

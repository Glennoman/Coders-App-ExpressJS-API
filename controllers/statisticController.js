// Mock database for submissions, coders, and challenges
const submissions = []; // Assume this is populated with submission data
const coders = []; // Assume this is populated with coder data

// Controller to get solved challenges statistics
const getSolvedChallengesStats = (req, res) => {
  const { coder_id } = req.query;

  // Filter submissions by the given coder and correct submissions
  const coderSubmissions = submissions.filter(
    (sub) => sub.coder_id === coder_id && sub.isCorrect
  );

  // Group by challenge difficulty levels
  const stats = coderSubmissions.reduce((acc, sub) => {
    const challenge = challenges.find(
      (challenge) => challenge.id === sub.challenge_id
    );
    if (challenge) {
      const level = challenge.level;
      if (!acc[level]) {
        acc[level] = 0;
      }
      acc[level]++;
    }
    return acc;
  }, {});

  res.json(stats);
};

// Controller to get trending categories
const getTrendingCategories = (req, res) => {
  const categoryCounts = submissions.reduce((acc, sub) => {
    const challenge = challenges.find(
      (challenge) => challenge.id === sub.challenge_id
    );
    if (challenge) {
      const category = challenge.category;
      if (!acc[category]) {
        acc[category] = 0;
      }
      acc[category]++;
    }
    return acc;
  }, {});

  const trendingCategories = Object.entries(categoryCounts)
    .sort((a, b) => b[1] - a[1])
    .map((entry) => ({ category: entry[0], count: entry[1] }));

  res.json(trendingCategories);
};

// Controller to get heatmap data
const getHeatmap = (req, res) => {
  const { coder_id, start_date, end_date } = req.query;

  // Filter submissions by date range and coder
  const startDate = new Date(start_date);
  const endDate = new Date(end_date);

  const coderSubmissions = submissions.filter((sub) => {
    const submissionDate = new Date(sub.date);
    return (
      sub.coder_id === coder_id &&
      sub.isCorrect &&
      submissionDate >= startDate &&
      submissionDate <= endDate
    );
  });

  const heatmap = coderSubmissions.reduce((acc, sub) => {
    const date = sub.date.split("T")[0]; // Extract date part
    if (!acc[date]) {
      acc[date] = 0;
    }
    acc[date]++;
    return acc;
  }, {});

  res.json(heatmap);
};

module.exports = {
  getSolvedChallengesStats,
  getTrendingCategories,
  getHeatmap,
};

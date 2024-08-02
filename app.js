const express = require("express");
const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const challengeRoutes = require("./routes/challengeRoutes");
const submissionRoutes = require("./routes/submissionRoutes");
const leaderboardRoutes = require("./routes/leaderboardRoutes");
const statisticRoutes = require("./routes/statisticRoutes");

const app = express();

app.use(express.json()); // Built-in middleware to parse JSON

app.use("/auth", authRoutes); // Route for authentication
app.use("/profile", profileRoutes);
app.use("/challenge", challengeRoutes);
app.use("/submission", submissionRoutes);
app.use("/leaderboard", leaderboardRoutes);
app.use("/statistics", statisticRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  if (err.isJoi) {
    res.status(400).json({ error: err.details[0].message });
  } else {
    res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = app;

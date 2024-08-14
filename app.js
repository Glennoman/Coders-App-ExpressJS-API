const express = require("express");
const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const challengeRoutes = require("./routes/challengeRoutes");
const submissionRoutes = require("./routes/submissionRoutes");
const leaderboardRoutes = require("./routes/leaderboardRoutes");
const statisticRoutes = require("./routes/statisticRoutes");
const { User } = require("./models/User");
const Challenge = require("./models/Challenge");

const mongoose = require("mongoose");

const mongoURI =
  "mongodb+srv://glennoronsaye:CLA12345@codersappdb.gbhmxeo.mongodb.net/?retryWrites=true&w=majority&appName=CodersAppDB";

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected...");
    seedData(); // Calling seedData after MongoDB connection is established
  })
  .catch((err) => console.log(err));

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

async function seedData() {
  // Check if data already exists
  const usersCount = await User.countDocuments();
  if (usersCount === 0) {
    // Create a manager
    const manager = new User({
      first_name: "John",
      last_name: "Doe",
      email: "manager@example.com",
      password: "password", // In a real application, passwords will be hashed
      role: "Manager",
    });
    await manager.save();

    // Create a coder
    const coder = new User({
      first_name: "Jane",
      last_name: "Smith",
      email: "coder@example.com",
      password: "password",
      role: "Coder",
      description: "I love solving problems!",
      score: 100,
    });
    await coder.save();

    // Create a challenge
    const challenge = new Challenge({
      title: "Factorial Challenge",
      category: "Math",
      description: "Compute the factorial of a non-negative integer.",
      difficulty_level: "Hard",
      manager: manager._id,
    });
    await challenge.save();

    console.log("Dummy data inserted");
  } else {
    console.log("Dummy data already exists.");
  }
}

module.exports = app;

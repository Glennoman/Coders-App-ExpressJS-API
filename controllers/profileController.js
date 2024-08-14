const jwt = require("jsonwebtoken");
const { User } = require("../models/User");

// Function
const getProfile = async (req, res) => {
  try {
    const { userId } = req.params;

    // Find the user's profile in the mock database
    const profile = await User.findById(userId);

    if (!profile) {
      return res.status(404).json({ error: "Profile not found" });
    }

    res.json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// Function to update a user's profile
const updateProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const { firstName, lastName, about } = req.body;

    // Find the user's profile in moch database
    let profile = await User.findById(userId);

    if (!profile) {
      return res.status(404).json({ error: "Profile not found" });
    }

    // Update the fields if they are provivided in request body
    profile.firstName = firstName || profile.firstName;
    profile.lastName = lastName || profile.lastName;
    profile.about = about || profile.about;

    await profile.save();

    res.json({ message: "Profile updated succesfully", profile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { getProfile, updateProfile };

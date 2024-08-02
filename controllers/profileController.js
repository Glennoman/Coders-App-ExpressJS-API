// Mock Database
const profiles = [];

// Function
const getProfile = (req, res) => {
  const { userId } = req.params;

  // Find the user's profile in the mock database
  const profile = profiles.find((p) => {
    p.userId === parseInt(userId);

    if (!profile) {
      return res.status(404).json({ error: "Profile not found" });
    }

    res.json(profile);
  });
};

// Function to update a user's profile
const updateProfile = (req, res) => {
  const { userId } = req.params;
  const { firstName, lastName, about } = req.body;

  // Find the user's profile in moch database
  let profile = profiles.find((p) => p.userId === parseInt(userId));

  if (!profile) {
    profile = { userId: parseInt(userId), firstName, lastName, about };
    profiles.push(profile);
  } else {
    profile.firstName = firstName || profile.firstName;
    profile.lastName = lastName || profile.lastName;
    profile.about = about || profile.about;
  }

  res.json({ message: "Profile updated succesfully", profile });
};

module.exports = { getProfile, updateProfile };

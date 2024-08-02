// Import libraries
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Mock database
const users = [];

// Function to handle user registration
const register = (req, res) => {
  const { username, password, role } = req.body;

  // Hash the password for security
  const hashedPassword = bcrypt.hashSync(password, 10);

  // Create new user object
  const newUser = {
    id: users.length + 1,
    username,
    password: hashedPassword,
    role,
  };

  // Add the new user to the moch database
  users.push(newUser);

  res
    .status(201)
    .json({ message: "User registered successfully", user: newUser });
};

// Function to handle user login
const login = (req, res) => {
  const { username, password } = req.body;

  // Find the user in the mock database
  const user = users.find((u) => u.username === username);

  if (!user) {
    return res.status(400).json({ error: "Invalid username or password" });
  }

  // Check if the password is correct
  const isPasswordValid = bcrypt.compareSync(password, user.password);

  if (!isPasswordValid) {
    return res.status(400).json({ error: "Invalid username or password" });
  }

  // Create a token for the user
  const token = jwt.sign({ id: user.id, role: user.role }, "secretKey", {
    expiresIn: "1h",
  });

  res.json({ message: "Login successful", token });
};

module.exports = { register, login };

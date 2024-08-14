// Import libraries
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models/User");

// Mock database
const users = [];

// Function to handle user registration
const register = (req, res) => {
  const { username, email, password, role } = req.body;

  // Hash the password for security
  const hashedPassword = bcrypt.hashSync(password, 10);

  // Create new user object
  const newUser = {
    id: users.length + 1,
    email,
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

// Creating new coder
const registerCoder = async (req, res) => {
  try {
    const { firstName, lastName, email, password, description } = req.body;

    const hashedPassword = bcrypt.hashSync(password, 10);

    const newCoder = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      description,
      role: "Coder",
    });

    await newCoder.save();

    res
      .status(201)
      .json({ message: "Coder registered successfully", coder: newCoder });
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Creating new manager
const registerManager = async (req, res) => {
  try {
    const { firstName, lastName, email, password, description } = req.body;

    const hashedPassword = bcrypt.hashSync(password, 10);

    const newManager = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      description,
      role: "Manager",
    });

    await newManager.save();

    res
      .status(201)
      .json({ message: "Manager registered succesfully", manager: newManager });
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Function to handle user login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user in the mock database
    const userLogin = await User.findOne({ email });

    // If User not found
    if (!userLogin) {
      return res.status(400).json({ error: "Invalid username" });
    }

    // Check if the password is correct
    const isPasswordValid = bcrypt.compareSync(password, userLogin.password);

    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid password" });
    }

    // Create a token for the user
    const token = jwt.sign(
      { id: userLogin._id, role: userLogin.role },
      "secretKey",
      { expiresIn: "1h" }
    );

    res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { register, registerCoder, registerManager, login };

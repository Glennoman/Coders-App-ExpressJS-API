const express = require("express");
const {
  register,
  registerCoder,
  registerManager,
  login,
} = require("../controllers/authController");
const {
  validateRegistration,
  validateLogin,
} = require("../middleware/validators");

const router = express.Router();

router.post("/register", validateRegistration, register);
router.post("/login/coder", validateLogin, login);
router.post("/login/manager", validateLogin, login);
router.post("/register/coder", validateRegistration, registerCoder);
router.post("/register/manager", validateRegistration, registerManager);

module.exports = router;

const express = require("express");
const { postSubmission } = require("../controllers/submissionController");
const { validateSubmission } = require("../middleware/validators");

const router = express.Router();

router.post("/", validateSubmission, postSubmission);

module.exports = router;

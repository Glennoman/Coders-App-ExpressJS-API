const { PiStack } = require("react-icons/pi");

// Mock database for submissions
const submissions = [];

// Controller to handle the submission of code for grading
const postSubmission = (req, res) => {
  const { lang, code, challenge_id } = req.body;

  // Find challenge by ID
  const challenge = challenges.find(
    (challenge) => challenge.id === challenge_id
  );
  if (!challenge) {
    return res.status(404).json({ error: "Challenge not found" });
  }

  // Send code to grader
  const isCorrect = mockGrader(lang, code, challenge);

  // Save submission result
  const submission = {
    id: submissions.length + 1,
    lang,
    code,
    challenge_id,
    isCorrect,
  };
  submissions.push(submission);

  res.status(201).json({ message: "Submission received", isCorrect });
};

// Mock grader function to simulate code grading
const mockGrader = (lang, code, challenge) => {
  // simple grader only checks if code is the same as expected solution
  const expectedCode = challenge.code.code_text.find(
    (c) => c.language === lang
  ).text;
  return code.trim() === expectedCode.trim();
};

module.exports = { postSubmission };

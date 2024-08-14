const Joi = require("joi");

// Validator for registration data
const validateRegistration = (req, res, next) => {
  const schema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    description: Joi.string().required(),
    role: Joi.string().valid("Coder", "Manager").required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return next(error);
  }
  next();
};

// Validator for login data
const validateLogin = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return next(error);
  }
  next();
};

// Validator for challenge creation
const validateChallengeCreation = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    category: Joi.string().required(),
    description: Joi.string().required(),
    difficulty_level: Joi.string().valid("Easy", "Medium", "Hard").required(),
    code: Joi.object({
      function_name: Joi.string().required(),
      code_text: Joi.array()
        .items(
          Joi.object({
            language: Joi.string()
              .valid("py", "js", "c", "lua", "php", "java")
              .required(),
            text: Joi.string().required(),
          })
        )
        .required(),
      inputs: Joi.array()
        .items(
          Joi.object({
            name: Joi.string().required(),
            type: Joi.string().required(),
          })
        )
        .required(),
    }).required(),
    tests: Joi.array().items(
      Joi.object({
        weight: Joi.number().required(),
        inputs: Joi.array()
          .items(
            Joi.object({
              name: Joi.string().required(),
              value: Joi.any().required(),
            })
          )
          .required(),
        output: Joi.any().required(),
      })
    ),
    manager: Joi.required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

// Validator for code submission
const validateSubmission = (req, res, next) => {
  const schema = Joi.object({
    lang: Joi.string().valid("py", "js").required(),
    code: Joi.string().required(),
    challenge_id: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return next(error);
  }
  next();
};

// Validator for heatmap request
const validateHeatmap = (req, res, next) => {
  const schema = Joi.object({
    coder_id: Joi.string().required(),
    start_date: Joi.date().iso().required(),
    end_date: Joi.date().iso().required(),
  });

  const { error } = schema.validate(req.query);
  if (error) {
    return next(error);
  }
  next();
};

module.exports = {
  validateRegistration,
  validateLogin,
  validateChallengeCreation,
  validateSubmission,
  validateHeatmap,
};

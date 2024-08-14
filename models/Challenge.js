const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const challengeSchema = new Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  difficulty_level: {
    type: String,
    enum: ["Easy", "Medium", "Hard"],
    required: true,
  },
  code: {
    function_name: { type: String, required: true },
    code_text: [
      {
        language: {
          type: String,
          enum: ["py", "js", "c", "lua", "php", "java"],
          required: true,
        },
        text: { type: String, required: true },
      },
    ],
    inputs: [
      {
        name: { type: String, required: true },
        type: { type: String, required: true },
      },
    ],
  },
  tests: [
    {
      weight: { type: Number, required: true },
      inputs: [
        {
          name: { type: String, required: true },
          value: { type: Schema.Types.Mixed, required: true },
        },
      ],
      output: { type: Schema.Types.Mixed, required: true },
    },
  ],
  manager: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

module.exports = mongoose.model("Challenge", challengeSchema);

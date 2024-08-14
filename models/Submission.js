const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const submissionSchema = new Schema({
  submission_time: { type: Date, default: Date.now },
  passed_grading: { type: Boolean, default: false },
  final_score: { type: Number, default: 0 },
  submitted_code: { type: String, required: true },
  coder: { type: Schema.Types.ObjectId, ref: "Coder", required: true },
  challenge: { type: Schema.Types.ObjectId, ref: "Challenge", required: true },
});

module.exports = mongoose.model("Submission", submissionSchema);

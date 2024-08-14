const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const testCaseSchema = new schema({
  weight: { type: String, required: true },
  inputs: [
    {
      name: { type: String, required: true },
      value: { type: Schema.Types.Mixed, required: true },
    },
  ],
  output: { type: Schema.Types.Mixed, required: true },
  challenge: { type: Schema.Types.ObjectId, ref: "Challenge", required: true },
});

module.exports = mongoose.model("TestCase", testCaseSchema);

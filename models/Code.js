const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const codeSchema = new Schema({
  function_name: { type: String, required: true },
  language: { type: String, required: true },
  code_text: { type: String, required: true },
  challenge: { type: Schema.Types.ObjectId, ref: "Challenge", required: true },
});

module.exports = mongoose.model("Code", codeSchema);

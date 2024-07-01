const mongoose = require("mongoose");

const optionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  isCorrect: { type: Boolean, required: true, default: false },
});

const questionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  options: [optionSchema],
});

const testSchema = new mongoose.Schema({
  testId: { type: String, required: true, unique: true },
  testTitle: { type: String, required: true },
  questions: [questionSchema],
});

module.exports = mongoose.model("Test", testSchema);

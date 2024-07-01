const express = require("express");
const Test = require("../models/Test");
const router = express.Router();

// Create a new test
router.post("/", async (req, res) => {
  const { testId, testTitle, questions } = req.body;

  // Check if testId already exists
  try {
    const existingTest = await Test.findOne({ testId });
    if (existingTest) {
      return res.status(400).send({ error: "Test ID already exists" });
    }
  } catch (error) {
    console.error("Error checking existing test:", error);
    return res.status(500).send({ error: "Failed to create test", details: error.message });
  }

  const test = new Test({
    testId,
    testTitle,
    questions: questions.map((q) => ({
      questionText: q.question,
      options: q.options.map((opt, index) => ({
        text: opt,
        isCorrect: q.correctAnswers.includes(index),
      })),
    })),
  });

  try {
    await test.save();
    console.log("Test saved successfully");
    res.status(201).send({ message: "Test created successfully!" });
  } catch (error) {
    console.error("Error creating test:", error);
    res.status(500).send({ error: "Failed to create test", details: error.message });
  }
});

// Get all tests
router.get("/", async (req, res) => {
  try {
    const tests = await Test.find();
    console.log("All tests:", tests);  // Display the tests in the console
    res.status(200).json(tests);
  } catch (error) {
    console.error("Error fetching tests:", error);
    res.status(500).send({ error: "Failed to fetch tests", details: error.message });
  }
});

// Get a specific test by testId
router.get("/:testId", async (req, res) => {
  const { testId } = req.params;

  try {
    const test = await Test.findOne({ testId });
    if (!test) {
      return res.status(404).send({ error: "Test not found" });
    }
    console.log("Found test:", test);
    res.status(200).json(test);
  } catch (error) {
    console.error("Error fetching test:", error);
    res.status(500).send({ error: "Failed to fetch test", details: error.message });
  }
});

module.exports = router;

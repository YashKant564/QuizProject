const express = require("express");
const Quiz = require("../models/quiz");

const router = express.Router();

// Get all quizzes
router.get("/", async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch quizzes" });
  }
});

// Get a quiz by ID
router.get("/:id", async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      return res.status(404).json({ error: "Quiz not found" });
    }
    res.json(quiz);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch quiz" });
  }
});

// Add a new quiz
router.post("/", async (req, res) => {
  try {
    const newQuiz = new Quiz(req.body);
    await newQuiz.save();
    res.status(201).json(newQuiz);
  } catch (error) {
    res.status(500).json({ error: "Failed to create quiz" });
  }
});

// Add a question to a quiz
router.post("/:id/question", async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      return res.status(404).json({ error: "Quiz not found" });
    }

    quiz.questions.push(req.body);
    await quiz.save();
    res.status(200).json(quiz);
  } catch (error) {
    res.status(500).json({ error: "Failed to add question" });
  }
});

module.exports = router;
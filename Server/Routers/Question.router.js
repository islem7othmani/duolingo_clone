const express = require('express');
const { addQuestion, getQuestion, getQuestionsByCategory } = require("../Controllers/Question.controller");
const router = express.Router();

// Define the routes
router.post("/questions", addQuestion); // Changed to a more RESTful plural noun
router.get("/questions", getQuestion); // Consistent plural for fetching all questions
router.get("/questions/category/:category", getQuestionsByCategory); // Use 'category' in the route

// Export the router
module.exports = router;

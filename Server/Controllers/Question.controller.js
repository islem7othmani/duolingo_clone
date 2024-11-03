const Question = require('../Models/Question.model');
const mongoose = require("mongoose");

const addQuestion = async (req, res) => {
  console.log("Request body:", req.body); 
  const newQuestion = new Question({
    content: req.body.content,    
    response: req.body.response,  
    level: req.body.level,
    time: req.body.time,
    imageResponse: req.body.imageResponse,
    imageOption2: req.body.imageOption2,  // Updated field name
    option2: req.body.option2,  
    imageOption3: req.body.imageOption3,  // Updated field name
    option3: req.body.option3, 
    category: req.body.category, 
  });

  try {
    const savedQuestion = await newQuestion.save();
    return res.status(201).json(savedQuestion);
  } catch (err) {
    return res.status(500).json(err);
  }
};



const getQuestion = async (req, res) => {
    let searchObj = { ...req.query };
  
    // Ensure the search term is defined and not empty
    if (searchObj.q) {
      try {
        const questions = await Question.find({
          content: {
            $regex: new RegExp(searchObj.q, "i"), // Case-insensitive search
          },
        });
        return res.status(200).json(questions);
      } catch (err) {
        return res.status(500).json({ message: "Error retrieving questions", error: err });
      }
    } else {
      // If no search term is provided, return all questions
      try {
        const questions = await Question.find({});
        return res.status(200).json(questions);
      } catch (err) {
        return res.status(500).json({ message: "Error retrieving questions", error: err });
      }
    }
  };


  const getQuestionsByCategory = async (req, res) => {
    const { category } = req.params; // Use req.params for URL parameters
  
    if (!category) {
        return res.status(400).json({ message: "Category query parameter is required." });
    }
  
    try {
        const questions = await Question.find({ category });
        if (questions.length === 0) {
            return res.status(404).json({ message: "No questions found for this category." });
        }
        return res.status(200).json(questions);
    } catch (err) {
        return res.status(500).json({ message: "Error retrieving questions", error: err });
    }
};

  

module.exports = { addQuestion, getQuestion, getQuestionsByCategory };

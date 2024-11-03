const mongoose = require('mongoose');
const { Schema } = mongoose;

const QuestionSchema = new Schema({
  content: String,
  response: String,
  level: String,
  time: Number,
  imageResponse: String,
  imageOption2: String,  
  imageOption3: String,
  option2: String,
  option3: String,
  category: String
});

const Question = mongoose.model('Question', QuestionSchema);  

module.exports = Question;

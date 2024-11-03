const mongoose = require('mongoose');
const { Schema } = mongoose;

const message = new Schema({
  q: String,
 
});

const Message = mongoose.model('Message', message);  

module.exports = Message;

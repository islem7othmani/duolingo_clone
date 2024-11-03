const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username:{type:String},
    email:{type:String},
    password:{type:String},
    motherLanguage:{type:String},
    languageToLearn:{type:String},
    reason:{type:String},
    age:{type:Number}
})

const Learner = mongoose.model("Learner",userSchema)
module.exports=Learner
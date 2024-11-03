const { json } = require('express');
const Learner = require('../Models/User.model'); 
const bcryptjs = require("bcryptjs");
const jwt = require('jsonwebtoken'); 
const mongoose = require("mongoose");

const register = async (req, res) => {
    const codeG = "123456789azertyuiop^$qsdfghjklmù*wxcvbn&AZERTYUIOPMLKJHGFDSQWXCVBN";
    let activCod = "";
    for (let i = 0; i < 25; i++) {
        activCod += codeG[Math.floor(Math.random() * codeG.length)];
    }

    try {
        const existingUser = await Learner.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(422).json("Email already exists");
        }

        const hashedPassword = await bcryptjs.hash(req.body.password, 10);

        const newUser = new Learner({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            motherLanguage: req.body.motherLanguage,
            languageToLearn: req.body.languageToLearn, // Fixed key casing here
            reason: req.body.reason,
            age: req.body.age,
            activationCode: activCod // Added the activationCode to the schema
        });

        const savedUser = await newUser.save();
       // sendConfirmationEmail(newUser.email, activCod); // Use `activCod` for email confirmation
        return res.status(200).json(savedUser);
    } catch (err) {
        console.error('Error:', err); 
        return res.status(500).json(err);
    }
};



const login = async (req, res) => {
  try {
      if (!req.body.email || !req.body.password) {
          return res.status(400).json("Email and password are required");
      }

      const user = await Learner.findOne({ email: req.body.email });
      if (!user) return res.status(401).json("Address not found");

      const isValidPassword = await bcryptjs.compare(req.body.password, user.password);
      if (!isValidPassword) return res.status(401).json("Incorrect email or password");

    

      const token = jwt.sign(
          {
              _id: user._id,
          },
          process.env.TOKEN_KEY,
          {
              expiresIn: "2 days",
          }
      );

  


    
      return res.status(200).json({ token: token, user: user });

  } catch (err) {
      console.error('Error:', err); // Log the error
      return res.status(500).json(err);
  }
};

module.exports = {
    register,
    login
};

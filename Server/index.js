const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const bodyParser = require("body-parser");

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from this origin
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed methods
  credentials: true, // Enable credentials if needed
}));


const userRoutes = require('./Routers/Learner.router');
app.use('/authentification', userRoutes);
const testRoutes = require('./Routers/Question.router');
app.use('/test', testRoutes);
const translatorRoutes = require('./Routers/Translator'); // Correct path
app.use('/translation', translatorRoutes);


mongoose.connect(
  "mongodb+srv://webcamp36:34rkG6lJTQrdzaVx@cluster0.5hmqsyi.mongodb.net/"
);
mongoose.connection.on("connected", () => {
  console.log("DB connected");
});
mongoose.connection.on("error", (err) => {
  console.log("DB failed with err - ", err);
});

app.use(bodyParser.json());

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

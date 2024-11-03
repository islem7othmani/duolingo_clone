const { register, login } = require("../Controllers/Learner.controller");
//const { isAdmin } = require('../MiddleWares/isAdmin');  

const route = require("express").Router();
  
route.post("/register", register);
route.post("/login", login);

//route.get("/admin", isAdmin);

module.exports = route;
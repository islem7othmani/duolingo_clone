import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./Pages/Signup";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import AccountHome from "./Pages/AccountHome";
import Question from "./Pages/Question";
import Test from "./Components/Test"
import Test2 from "./Components/Test2"
import FrVeg from "./Pages/Fr&Veg";
import Translator from "./Pages/Translator";
import Chat from "./Pages/Chat";

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<AccountHome />} />
        <Route path="/question" element={<Question />} />
        <Route path="/test" element={<Test />} />
        <Route path="/test22" element={<Test2 />} />
        <Route path="/FrVeg" element={<FrVeg />} />
        <Route path="/translator" element={<Chat />} />
      </Routes>
    </Router>
  );
}

export default App;

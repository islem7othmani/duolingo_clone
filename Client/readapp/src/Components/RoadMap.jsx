import React, { useState, useEffect } from "react";
import Test2 from "./Test2";
import FrVeg from "../Pages/Fr&Veg";
import Cookies from "js-cookie";

export default function RoadMap() {
  const [activeLevel, setActiveLevel] = useState(null);

  const handleClick = (level) => {
    setActiveLevel(level);
  };

  const [score, setScore] = useState(0);
  const [fruitscore, setFruitscore] = useState(0);

  useEffect(() => {
    // Get quizScore from cookie
    const storedScore = Cookies.get('quizScore');
    if (storedScore) {
      setScore(parseInt(storedScore, 10)); // Convert the score to an integer
    }
    const storedFruitScore = Cookies.get('fruitscore');
    if (storedFruitScore) {
      setFruitscore(parseInt(storedFruitScore, 10)); // Convert the score to an integer
    }
  }, []);

  return (
    <div className="absolute left-48 top-20">
      <div className="relative bottom-12 bg-gradient-to-r from-blue-400 to-blue-600 h-28 rounded-xl shadow-lg transform transition duration-500 hover:scale-105 flex items-center justify-center text-white text-lg font-semibold">
        You completed 54% of the basic level.
      </div>

      <div className="hidden flex gap-12 relative right-20">
        <h1
          onClick={() => handleClick("entry")}
          className={`text-2xl font-bold mb-6 cursor-pointer ${activeLevel === "entry" ? "underline text-blue-500" : ""}`}
        >
          <a href="/entry-level">Entry Level</a>
        </h1>
        <h1
          onClick={() => handleClick("medium")}
          className={`text-2xl font-bold mb-6 cursor-pointer ${activeLevel === "medium" ? "underline text-blue-500" : ""}`}
        >
          <a href="/medium-level">Medium Level</a>
        </h1>
        <h1
          onClick={() => handleClick("advanced")}
          className={`text-2xl font-bold mb-6 cursor-pointer ${activeLevel === "advanced" ? "underline text-blue-500" : ""}`}
        >
          <a href="/advanced-level">Advanced Level</a>
        </h1>
      </div>

      <div className="relative">
        <div className="relative">
          <a href="/test22" className="">
            <div className="flex gap-4 border py-6 px-10 rounded-xl shadow-lg">
              <div>
                <img
                  className="h-20 rounded-2xl"
                  src="https://img.freepik.com/free-vector/colorful-education-concept-with-flat-design_23-2147902567.jpg?t=st=1729969996~exp=1729973596~hmac=b32314284908a854f02fbb334e02da670598f92e04587215144f592f87943587&w=740"
                  alt=""
                />
              </div>
              <div>
                <h3 className="font-semibold">Step 1</h3>
                <h1 className="font-bold text-xl pb-1">
                  Learn Colors in English
                </h1>
                <p>In this module, you will learn the basics of colors in English.</p>
              </div>
              <div>
                You completed {score} /3
              </div>
            </div>
          </a>
        </div>

        <div className="relative top-4">
          <a href="/FrVeg" className="">
            <div className="flex gap-4 border py-6 px-10 rounded-xl shadow-lg">
              <div>
                <img
                  className="h-20 rounded-2xl"
                  src="https://img.freepik.com/free-vector/realistic-vegetables-fruits-background_52683-4818.jpg?t=st=1729970790~exp=1729974390~hmac=91e86d62f793743fb6de3d61901468fcefb7d0a3cec8d94011d1e696f2bee761&w=740"
                  alt=""
                />
              </div>
              <div>
                <h3 className="font-semibold">Step 2</h3>
                <h1 className="font-bold text-xl pb-1">
                  Learn Fruits and Vegetables in English
                </h1>
                <p>In this module, you will learn the basics of fruits and vegetables in English.</p>
              </div>
              <div>
                You completed {fruitscore} /3
              </div>
            </div>
          </a>
        </div>

        <div className="relative top-4">
          <a href="/test22" className="">
            <div className="flex gap-4 border py-6 px-10 rounded-xl shadow-lg">
              <div>
                <img
                  className="h-20 rounded-2xl"
                  src="https://img.freepik.com/premium-vector/illustration-muslim-kid-saying-hello-with-simple-minimalist-flat-design-style_995281-7120.jpg?w=740"
                  alt=""
                />
              </div>
              <div>
                <h3 className="font-semibold">Step 3</h3>
                <h1 className="font-bold text-xl pb-1">
                  Learn Greetings in English
                </h1>
                <p>In this module, you will learn the basics of greetings in English.</p>
              </div>
            </div>
          </a>
        </div>
      </div>

      {/* Render Test2 component based on the active level */}
      {activeLevel && (
        <div className="relative mt-6">
          <Test2 level={activeLevel} />
        </div>
      )}
    </div>
  );
}

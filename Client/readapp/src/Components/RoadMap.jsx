import React, { useState, useEffect } from "react";
import Test2 from "./Test2";
import FrVeg from "../Pages/Fr&Veg";
import Cookies from "js-cookie";

export default function RoadMap() {
  const [activeLevel, setActiveLevel] = useState(null);
  const [score, setScore] = useState(0);
  const [fruitscore, setFruitscore] = useState(0);
  const [isThirdUnlocked, setIsThirdUnlocked] = useState(false);
  const [showCongrats, setShowCongrats] = useState(false);

  useEffect(() => {
    // Get scores from cookies
    const storedScore = Cookies.get("quizScore");
    if (storedScore) {
      setScore(parseInt(storedScore, 10));
    }

    const storedFruitScore = Cookies.get("fruitscore");
    if (storedFruitScore) {
      setFruitscore(parseInt(storedFruitScore, 10));
    }
  }, []);

  useEffect(() => {
    // Unlock third module if both scores are 3/3
    if (score === 3 && fruitscore === 3) {
      setIsThirdUnlocked(true);
      setShowCongrats(true);
    }
  }, [score, fruitscore]);

  const handleClick = (level) => {
    setActiveLevel(level);
  };

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
              <div className="relative left-28">
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

        <div className={`relative top-4 ${isThirdUnlocked ? "" : "opacity-50 cursor-not-allowed"}`}>
          <a href="/test22" className={isThirdUnlocked ? "" : "pointer-events-none"}>
            <div className="flex gap-4 border py-6 px-10 rounded-xl shadow-lg relative">
              {!isThirdUnlocked && (
                <div className="absolute inset-0 bg-white bg-opacity-80 rounded-xl flex items-center justify-center z-10">
                  <span className="text-gray-700 text-lg font-semibold flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 11c0-1.657-1.343-3-3-3s-3 1.343-3 3v3m6 0H9m6 0h-1m0-7h-1.586a1 1 0 00-.707.293l-4.293 4.293a1 1 0 000 1.414l4.293 4.293a1 1 0 00.707.293H13m0 0h1m0 0a3 3 0 013 3h1m-1 0h-1" />
                    </svg>
                    Locked
                  </span>
                </div>
              )}
              <div>
                <img
                  className="h-20 rounded-2xl"
                  src="https://img.freepik.com/premium-vector/illustration-muslim-kid-saying-hello-with-simple-minimalist-flat-design-style_995281-7120.jpg?w=740"
                  alt=""
                />
              </div>
              <div className="pl-2">
                <h3 className="font-semibold text-gray-600">Step 3</h3>
                <h1 className="font-bold text-xl pb-1 text-gray-800">
                  Learn Greetings in English
                </h1>
                <p className="text-gray-600">In this module, you will learn the basics of greetings in English.</p> 
              </div>
            </div>
          </a>
        </div>
      </div>

      {showCongrats && (
        <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-lg shadow-md">
          🎉 Congrats! You've unlocked Step 3!
        </div>
      )}

      {/* Render Test2 component based on the active level */}
      {activeLevel && (
        <div className="relative mt-6">
          <Test2 level={activeLevel} />
        </div>
      )}
    </div>
  );
}

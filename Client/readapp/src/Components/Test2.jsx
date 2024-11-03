import React, { useState, useEffect } from "react";
import Cookies from 'js-cookie'; // Import js-cookie
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Test2 = () => {
  const [voices, setVoices] = useState([]);
  const [questions, setQuestions] = useState([]); // Renamed for clarity
  const [index, setIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const navigate = useNavigate(); // Initialize navigate function

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        // Fetch only questions with category 'color'
        const response = await fetch(`http://localhost:8000/test/questions/category/color`);
        if (!response.ok) {
          throw new Error("Failed to fetch questions");
        }
        const data = await response.json();
        setQuestions(data); // Assuming the API returns an array with one or more questions
      } catch (error) {
        setError("Error fetching questions. Please try again later.");
        console.error("Error fetching questions:", error);
      } finally {
        setLoading(false); // Set loading to false regardless of success or failure
      }
    };

    fetchQuestions();
  }, []);

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      const englishVoices = availableVoices.filter((voice) =>
        voice.lang.startsWith("en")
      );
      setVoices(englishVoices);
    };

    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }

    loadVoices();
  }, []);

  const speakText = (text) => {
    if ("speechSynthesis" in window) {
      const synth = window.speechSynthesis;
      if (synth.speaking) {
        synth.cancel();
      }

      const utterThis = new SpeechSynthesisUtterance(text);
      utterThis.lang = "en-US";

      if (voices.length > 0) {
        utterThis.voice = voices[0];
      }

      synth.speak(utterThis);
    } else {
      console.error("SpeechSynthesis is not supported in this browser.");
    }
  };

  const handleOptionClick = (option) => {
    if (selectedOption) return; // Prevent multiple clicks
    setSelectedOption(option);
    speakText(option.text);

    if (option.text === questions[index]?.response) {
      setIsCorrect(true);
      setScore((prevScore) => prevScore + 1);
    } else {
      setIsCorrect(false);
    }
  };

  const handleNextQuestion = () => {
    if (index === questions.length - 1) {
      // Store the score in a cookie before showing the score
      Cookies.set('quizScore', score, { expires: 7 }); // expires in 7 days
      setShowScore(true);
    } else {
      setIndex((prevIndex) => prevIndex + 1);
    }
    setSelectedOption(null);
    setIsCorrect(null);
  };

  useEffect(() => {
    if (showScore) {
      setTimeout(() => {
        navigate("/Home"); // Redirect to home after quiz completion
      }, 3000); // Optional: delay for 3 seconds to show the final score before redirect
    }
  }, [showScore, navigate]);

  if (loading) {
    return <div>Loading questions...</div>; // Loading state message
  }

  if (error) {
    return <div>{error}</div>; // Error state message
  }

  return (
    <div className="quiz-container p-6">
      {showScore ? (
        <div className="score-container text-center">
          <h2 className="text-2xl font-bold mb-4">Congratulations!</h2>
          <p className="text-lg">Your final score is: {score}/{questions.length}</p>
        </div>
      ) : (
        questions.length > 0 && (
          <div className="relative top-12 left-56 w-2/3">
            <div className="progress-bar bg-gray-200 rounded-full h-2 mb-4">
              <div
                className="bg-blue-500 h-2 rounded-full"
                style={{ width: `${((index + 1) / questions.length) * 100}%` }}
              />
            </div>

            <h2 className="text-2xl font-bold mb-4">{questions[index].content}</h2>

            <div className="options grid grid-cols-3 gap-4">
              {[ 
                { text: questions[index].response, image: questions[index].imageResponse },
                { text: questions[index].option2, image: questions[index].imageOption2 },
                { text: questions[index].option3, image: questions[index].imageOption3 },
              ].map((option, optionIndex) => (
                <div
                  key={optionIndex}
                  className="option-card p-4 border rounded-lg shadow hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleOptionClick(option)}
                  aria-label={option.text} // Accessibility
                >
                  <img
                    src={option.image}
                    alt={option.text}
                    className="w-32 h-32 object-cover mb-2"
                  />
                  <p className="text-lg font-semibold">{option.text}</p>
                </div>
              ))}
            </div>

            <button
              className="mt-4 p-2 bg-blue-500 text-white rounded"
              onClick={handleNextQuestion}
              disabled={selectedOption === null} // Disable button until an option is selected
            >
              {index === questions.length - 1 ? "Finish" : "Next Question"}
            </button>

            {selectedOption && (
              <div className="selected-option mt-6 p-4 border rounded-lg bg-green-100">
                <h3 className="text-xl font-semibold">You selected: {selectedOption.text}</h3>
                <img
                  src={selectedOption.image}
                  alt={selectedOption.text}
                  className="w-32 h-32 object-cover mt-2"
                />
                {isCorrect !== null && (
                  <h3 className={`text-xl font-semibold mt-2 ${isCorrect ? "text-green-600" : "text-red-600"}`}>
                    {isCorrect ? "Correct!" : "Incorrect!"}
                  </h3>
                )}
              </div>
            )}
          </div>
        )
      )}
    </div>
  );
};

export default Test2;

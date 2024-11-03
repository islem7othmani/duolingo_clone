import React, { useState } from 'react';

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const quizData = [
    {
      question: "What is the capital of France?",
      answers: [
        { text: "Berlin", isCorrect: false },
        { text: "Madrid", isCorrect: false },
        { text: "Paris", isCorrect: true },
        { text: "Rome", isCorrect: false },
      ],
    },
    {
      question: "Which language runs in a web browser?",
      answers: [
        { text: "Java", isCorrect: false },
        { text: "C", isCorrect: false },
        { text: "Python", isCorrect: false },
        { text: "JavaScript", isCorrect: true },
      ],
    },
    // More questions...
  ];

  const handleAnswerOptionClick = (isCorrect) => {
    setIsAnswered(true);
    setSelectedAnswer(isCorrect);

    if (isCorrect) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    setIsAnswered(false);
    setSelectedAnswer(null);

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < quizData.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  return (
    <div className="bg-gray-100 h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-xl">
        {showScore ? (
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-6">
              Your Score: {score}/{quizData.length}
            </h1>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              onClick={() => window.location.reload()}
            >
              Restart Quiz
            </button>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <h2 className="text-2xl font-semibold">
                {quizData[currentQuestion].question}
              </h2>
            </div>

            <div className="flex flex-col gap-4">
              {quizData[currentQuestion].answers.map((answer, index) => (
                <button
                  key={index}
                  className={`p-4 rounded-lg text-lg font-medium ${
                    selectedAnswer === answer.isCorrect
                      ? answer.isCorrect
                        ? 'bg-green-500 text-white'
                        : 'bg-red-500 text-white'
                      : 'bg-blue-100 hover:bg-blue-200'
                  }`}
                  onClick={() => handleAnswerOptionClick(answer.isCorrect)}
                  disabled={isAnswered}
                >
                  {answer.text}
                </button>
              ))}
            </div>

            {isAnswered && (
              <button
                className="mt-6 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
                onClick={handleNextQuestion}
              >
                Next Question
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}

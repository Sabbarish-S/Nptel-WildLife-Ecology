


import React from "react";
import { quizzes } from "../data/quizData";

function QuizList({ selectQuiz }) {
  return (
    <div className="flex flex-col items-center p-5 space-y-4 max-w-md mx-auto">
      <h1 className="text-3xl font-bold text-indigo-600 text-center">Select Your Quiz</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
        {quizzes.map((quiz, index) => (
          <button
            key={index}
            onClick={() => selectQuiz(index)}
            className="p-4 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white font-semibold rounded-lg shadow-md hover:scale-105 transform transition-all duration-300 text-center"
          >
            {quiz.title}
          </button>
        ))}
      </div>
    </div>
  );
}

export default QuizList;

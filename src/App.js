import React, { useState } from "react";
import QuizList from "./components/QuizList";
import Quiz from "./components/Quiz";
import { quizzes } from "./data/quizData";

function App() {
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [weeklyScores, setWeeklyScores] = useState([]); // Array to hold weekly scores

  const finishQuiz = (finalScore) => {
    // Update the weekly score for the selected quiz
    setWeeklyScores((prevScores) => {
      const updatedScores = [...prevScores];
      updatedScores[selectedQuiz] = finalScore;
      return updatedScores;
    });
    setSelectedQuiz(null); // Go back to quiz selection
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-r from-teal-400 to-blue-500 p-6">
      {selectedQuiz === null ? (
        <>
          <QuizList selectQuiz={(index) => setSelectedQuiz(index)} />
          {weeklyScores.length > 0 && (
            <div className="mt-8 space-y-2">
              <h2 className="text-xl font-bold text-yellow-300">Weekly Scores:</h2>
              {quizzes.map((quiz, index) => (
                <div key={index} className="text-lg text-white">
                  {quiz.title}: {weeklyScores[index] !== undefined ? weeklyScores[index] : "Not attempted"}
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        <Quiz quiz={quizzes[selectedQuiz]} finishQuiz={finishQuiz} />
      )}
    </div>
  );
}

export default App;

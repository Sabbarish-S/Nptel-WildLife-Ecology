// import React, { useState } from "react";

// function Quiz({ quiz, finishQuiz }) {
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [score, setScore] = useState(0);
//   const [selectedAnswers, setSelectedAnswers] = useState(Array(quiz.questions.length).fill("")); // Store selected answers for each question
//   const [markedQuestions, setMarkedQuestions] = useState(new Set());
//   const [flaggedQuestions, setFlaggedQuestions] = useState(new Set());
//   const [skippedQuestions, setSkippedQuestions] = useState(new Set());
//   const [answeredQuestions, setAnsweredQuestions] = useState(new Set());
//   const [showCompletionPrompt, setShowCompletionPrompt] = useState(false);

//   const handleAnswerSelection = (option) => {
//     const updatedAnswers = [...selectedAnswers];
//     updatedAnswers[currentQuestion] = option;
//     setSelectedAnswers(updatedAnswers);

//     // Update score only if the answer changes
//     if (!answeredQuestions.has(currentQuestion)) {
//       setAnsweredQuestions((prev) => new Set(prev).add(currentQuestion));
//       if (option === quiz.questions[currentQuestion].answer) {
//         setScore(score + 1);
//       }
//     } else if (updatedAnswers[currentQuestion] !== quiz.questions[currentQuestion].answer) {
//       setScore((prevScore) => (option === quiz.questions[currentQuestion].answer ? prevScore + 1 : prevScore - 1));
//     }
//   };

//   const handleNext = () => {
//     if (currentQuestion + 1 < quiz.questions.length) {
//       setCurrentQuestion(currentQuestion + 1);
//     } else {
//       checkCompletion();
//     }
//   };

//   const handlePrevious = () => {
//     if (currentQuestion > 0) {
//       setCurrentQuestion(currentQuestion - 1);
//     }
//   };

//   const handleSkip = () => {
//     setSkippedQuestions((prev) => new Set(prev).add(currentQuestion));
//     handleNext();
//   };

//   const handleMark = () => {
//     setMarkedQuestions((prev) => {
//       const updated = new Set(prev);
//       if (updated.has(currentQuestion)) {
//         updated.delete(currentQuestion);
//       } else {
//         updated.add(currentQuestion);
//       }
//       return updated;
//     });
//   };

//   const handleFlag = () => {
//     setFlaggedQuestions((prev) => {
//       const updated = new Set(prev);
//       if (updated.has(currentQuestion)) {
//         updated.delete(currentQuestion);
//       } else {
//         updated.add(currentQuestion);
//       }
//       return updated;
//     });
//   };

//   const jumpToQuestion = (index) => {
//     setCurrentQuestion(index);
//   };

//   const checkCompletion = () => {
//     const unansweredQuestions = quiz.questions.map((_, index) => index).filter(
//       (index) =>
//         !answeredQuestions.has(index) &&
//         !skippedQuestions.has(index) &&
//         !markedQuestions.has(index)
//     );
//     if (unansweredQuestions.length > 0 || markedQuestions.size > 0) {
//       setShowCompletionPrompt(true);
//     } else {
//       finishQuiz(score);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center p-5 space-y-6 bg-gray-50 shadow-md rounded-md max-w-lg mx-auto">
//       <h3 className="text-2xl font-bold text-blue-600 text-center">{quiz.title}</h3>

//       <div className="flex flex-wrap gap-2 justify-center">
//         {quiz.questions.map((_, index) => (
//           <button
//             key={index}
//             onClick={() => jumpToQuestion(index)}
//             className={`w-8 h-8 rounded-full ${
//               index === currentQuestion
//                 ? "bg-blue-500 text-white"
//                 : markedQuestions.has(index)
//                 ? "bg-purple-500 text-white"
//                 : flaggedQuestions.has(index)
//                 ? "bg-red-500 text-white"
//                 : skippedQuestions.has(index)
//                 ? "bg-yellow-500 text-white"
//                 : answeredQuestions.has(index)
//                 ? "bg-green-500 text-white"
//                 : "bg-gray-300 text-gray-700"
//             }`}
//           >
//             {index + 1}
//           </button>
//         ))}
//       </div>

//       <p className="text-lg font-semibold text-center" dangerouslySetInnerHTML={{ __html: quiz.questions[currentQuestion].question }} />

//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
//         {quiz.questions[currentQuestion].options.map((option, index) => {
//           let buttonStyles =
//             "p-3 rounded-md font-medium transition-colors duration-200 text-center ";

//           if (selectedAnswers[currentQuestion]) {
//             if (option === quiz.questions[currentQuestion].answer) {
//               buttonStyles += "bg-green-500 text-white";
//             } else if (option === selectedAnswers[currentQuestion]) {
//               buttonStyles += "bg-red-500 text-white";
//             } else {
//               buttonStyles += "bg-white text-blue-500 border border-blue-500";
//             }
//           } else {
//             buttonStyles += "bg-white text-blue-500 border border-blue-500 hover:bg-blue-100";
//           }

//           return (
//             <button
//               key={index}
//               onClick={() => handleAnswerSelection(option)}
//               className={buttonStyles}
//               disabled={selectedAnswers[currentQuestion] !== ""}
//             >
//               {option}
//             </button>
//           );
//         })}
//       </div>

//       <div className="mt-4 flex flex-wrap gap-3 justify-center">
//         <button
//           onClick={handlePrevious}
//           disabled={currentQuestion === 0}
//           className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition duration-200"
//         >
//           Previous
//         </button>

//         <button
//           onClick={handleNext}
//           className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-200"
//         >
//           Next
//         </button>

//         <button
//           onClick={handleSkip}
//           className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition duration-200"
//         >
//           Skip
//         </button>

//         <button
//           onClick={handleMark}
//           className={`px-4 py-2 rounded-md transition duration-200 ${
//             markedQuestions.has(currentQuestion)
//               ? "bg-purple-600 text-white"
//               : "bg-gray-300 text-gray-700"
//           }`}
//         >
//           {markedQuestions.has(currentQuestion) ? "Unmark" : "Mark"}
//         </button>

//         <button
//           onClick={handleFlag}
//           className={`px-4 py-2 rounded-md transition duration-200 ${
//             flaggedQuestions.has(currentQuestion)
//               ? "bg-red-500 text-white"
//               : "bg-gray-300 text-gray-700"
//           }`}
//         >
//           {flaggedQuestions.has(currentQuestion) ? "Unflag" : "Flag"}
//         </button>
//       </div>

//       {showCompletionPrompt && (
//         <div className="mt-4 p-3 bg-yellow-200 text-yellow-700 rounded-md">
//           Please complete all questions, including marked, flagged, and skipped ones, before finishing the quiz.
//         </div>
//       )}

//       <div className="mt-4 text-lg font-semibold text-indigo-700 text-center">
//         Current Score: {score} / {quiz.questions.length}
//       </div>
//     </div>
//   );
// }

// export default Quiz;

import React, { useState } from "react";

function Quiz({ quiz, finishQuiz }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState(Array(quiz.questions.length).fill("")); // Store selected answers for each question
  const [markedQuestions, setMarkedQuestions] = useState(new Set());
  const [flaggedQuestions, setFlaggedQuestions] = useState(new Set());
  const [skippedQuestions, setSkippedQuestions] = useState(new Set());
  const [showCompletionPrompt, setShowCompletionPrompt] = useState(false);
  const [finalScore, setFinalScore] = useState(null); // State to store the final score
  const [showResults, setShowResults] = useState(false); // Flag to show results after quiz submission
  const [quizSubmitted, setQuizSubmitted] = useState(false); // Track if the quiz is submitted

  const handleAnswerSelection = (option) => {
    if (!quizSubmitted) { // Allow selection only if quiz is not submitted
      const updatedAnswers = [...selectedAnswers];
      updatedAnswers[currentQuestion] = option;
      setSelectedAnswers(updatedAnswers);
    }
  };

  const handleNext = () => {
    if (currentQuestion + 1 < quiz.questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSkip = () => {
    setSkippedQuestions((prev) => new Set(prev).add(currentQuestion));
    handleNext();
  };

  const handleMark = () => {
    setMarkedQuestions((prev) => {
      const updated = new Set(prev);
      if (updated.has(currentQuestion)) {
        updated.delete(currentQuestion);
      } else {
        updated.add(currentQuestion);
      }
      return updated;
    });
  };

  const handleFlag = () => {
    setFlaggedQuestions((prev) => {
      const updated = new Set(prev);
      if (updated.has(currentQuestion)) {
        updated.delete(currentQuestion);
      } else {
        updated.add(currentQuestion);
      }
      return updated;
    });
  };

  const jumpToQuestion = (index) => {
    setCurrentQuestion(index);
  };

  const checkCompletion = () => {
    const unansweredQuestions = quiz.questions.map((_, index) => index).filter(
      (index) =>
        !selectedAnswers[index] &&
        !skippedQuestions.has(index) &&
        !markedQuestions.has(index)
    );

    if (unansweredQuestions.length > 0 || markedQuestions.size > 0) {
      setShowCompletionPrompt(true);
    } else {
      evaluateQuiz();
    }
  };

  const evaluateQuiz = () => {
    const score = selectedAnswers.reduce((acc, answer, index) => {
      return answer === quiz.questions[index].answer ? acc + 1 : acc;
    }, 0);
    setFinalScore(score);
    setShowResults(true);
    setQuizSubmitted(true); // Mark the quiz as submitted
  };

  const handleReturnHome = () => {
    finishQuiz(finalScore); // Call finishQuiz with the final score when returning home
  };

  return (
    <div className="flex flex-col items-center p-5 space-y-6 bg-gray-50 shadow-md rounded-md max-w-lg mx-auto">
      <h3 className="text-2xl font-bold text-blue-600 text-center">{quiz.title}</h3>

      <div className="flex flex-wrap gap-2 justify-center">
        {quiz.questions.map((_, index) => (
          <button
            key={index}
            onClick={() => jumpToQuestion(index)}
            className={`w-8 h-8 rounded-full ${
              index === currentQuestion
                ? "bg-blue-500 text-white"
                : markedQuestions.has(index)
                ? "bg-purple-500 text-white"
                : flaggedQuestions.has(index)
                ? "bg-red-500 text-white"
                : skippedQuestions.has(index)
                ? "bg-yellow-500 text-white"
                : selectedAnswers[index]
                ? "bg-green-500 text-white"
                : "bg-gray-300 text-gray-700"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      <p className="text-lg font-semibold text-center" dangerouslySetInnerHTML={{ __html: quiz.questions[currentQuestion].question }} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
        {quiz.questions[currentQuestion].options.map((option, index) => {
          let buttonStyles = "p-3 rounded-md font-medium transition-colors duration-200 text-center ";

          // Update styles based on quiz submission
          if (showResults) {
            if (option === quiz.questions[currentQuestion].answer) {
              buttonStyles += "bg-green-500 text-white"; // Correct answer
            } else if (selectedAnswers[currentQuestion] === option) {
              buttonStyles += "bg-red-500 text-white"; // Selected but incorrect answer
            } else {
              buttonStyles += "bg-white text-blue-500 border border-blue-500"; // Not selected
            }
          } else {
            // Styles during the quiz
            buttonStyles += selectedAnswers[currentQuestion] === option
              ? "bg-blue-300 text-white"
              : "bg-white text-blue-500 border border-blue-500 hover:bg-blue-100";
          }

          return (
            <button
              key={index}
              onClick={() => handleAnswerSelection(option)}
              className={buttonStyles}
              disabled={quizSubmitted} // Disable if quiz is submitted
            >
              {option}
            </button>
          );
        })}
      </div>

      <div className="mt-4 flex flex-wrap gap-3 justify-center">
        <button
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition duration-200"
        >
          Previous
        </button>

        <button
          onClick={handleNext}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-200"
        >
          Next
        </button>

        <button
          onClick={handleSkip}
          className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition duration-200"
        >
          Skip
        </button>

        <button
          onClick={handleMark}
          className={`px-4 py-2 rounded-md transition duration-200 ${
            markedQuestions.has(currentQuestion)
              ? "bg-purple-600 text-white"
              : "bg-gray-300 text-gray-700"
          }`}
        >
          {markedQuestions.has(currentQuestion) ? "Unmark" : "Mark"}
        </button>

        <button
          onClick={handleFlag}
          className={`px-4 py-2 rounded-md transition duration-200 ${
            flaggedQuestions.has(currentQuestion)
              ? "bg-red-500 text-white"
              : "bg-gray-300 text-gray-700"
          }`}
        >
          {flaggedQuestions.has(currentQuestion) ? "Unflag" : "Flag"}
        </button>
      </div>

      {showCompletionPrompt && (
        <div className="mt-4 p-3 bg-yellow-200 text-yellow-700 rounded-md">
          Please complete all questions, including marked, flagged, and skipped ones, before finishing the quiz.
        </div>
      )}

      <div className="mt-4 text-lg font-semibold text-indigo-700 text-center">
        {showResults ? (
          <>
            Your final score: {finalScore} / {quiz.questions.length}
            <div className="mt-2">
              {quiz.questions.map((question, index) => (
                <div key={index} className="mt-2">
                  <p dangerouslySetInnerHTML={{ __html: question.question }} />
                  <p className={selectedAnswers[index] === question.answer ? "text-green-500" : "text-red-500"}>
                    {selectedAnswers[index] === question.answer ? "Correct!" : "Incorrect!"} 
                    {selectedAnswers[index] && ` Your answer: ${selectedAnswers[index]}. Correct answer: ${question.answer}.`}
                  </p>
                </div>
              ))}
            </div>
          </>
        ) : (
          "Current Score: Not submitted yet."
        )}
      </div>

      <button
        onClick={checkCompletion}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
      >
        Submit Quiz
      </button>

      {showResults && (
        <button
          onClick={handleReturnHome}
          className="mt-4 px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-800 transition duration-200"
        >
          Return to Home
        </button>
      )}
    </div>
  );
}

export default Quiz;

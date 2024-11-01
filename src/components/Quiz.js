import React, { useState } from "react";

function Quiz({ quiz, finishQuiz }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [isAnswered, setIsAnswered] = useState(false);
  const [markedQuestions, setMarkedQuestions] = useState(new Set());
  const [flaggedQuestions, setFlaggedQuestions] = useState(new Set());
  const [skippedQuestions, setSkippedQuestions] = useState(new Set());
  const [answeredQuestions, setAnsweredQuestions] = useState(new Set());
  const [showCompletionPrompt, setShowCompletionPrompt] = useState(false);

  const handleAnswerSelection = (option) => {
    setSelectedOption(option);
    setIsAnswered(true);
    if (option === quiz.questions[currentQuestion].answer) {
      setScore(score + 1);
    }
    setAnsweredQuestions((prev) => new Set(prev).add(currentQuestion));
  };

  const handleNext = () => {
    if (currentQuestion + 1 < quiz.questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      checkCompletion();
    }
    resetQuestionState();
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      resetQuestionState();
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
    resetQuestionState();
  };

  const resetQuestionState = () => {
    setSelectedOption("");
    setIsAnswered(false);
  };

  const checkCompletion = () => {
    const unansweredQuestions = quiz.questions.map((_, index) => index).filter(
      (index) =>
        !answeredQuestions.has(index) &&
        !skippedQuestions.has(index) &&
        !markedQuestions.has(index)
    );
    if (unansweredQuestions.length > 0 || markedQuestions.size > 0) {
      setShowCompletionPrompt(true);
    } else {
      finishQuiz(score);
    }
  };

  return (
    <div className="flex flex-col items-center p-5 space-y-6 bg-gray-50 shadow-md rounded-md">
      <h3 className="text-2xl font-bold text-blue-600">{quiz.title}</h3>

      <div className="flex space-x-2">
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
                : answeredQuestions.has(index)
                ? "bg-green-500 text-white"
                : "bg-gray-300 text-gray-700"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      <p className="text-lg font-semibold">
        {quiz.questions[currentQuestion].question}
      </p>

      <div className="grid grid-cols-2 gap-4">
        {quiz.questions[currentQuestion].options.map((option, index) => {
          let buttonStyles =
            "p-3 rounded-md font-medium transition-colors duration-200 ";

          if (isAnswered) {
            if (option === quiz.questions[currentQuestion].answer) {
              buttonStyles += "bg-green-500 text-white";
            } else if (option === selectedOption) {
              buttonStyles += "bg-red-500 text-white";
            } else {
              buttonStyles += "bg-white text-blue-500 border border-blue-500";
            }
          } else {
            buttonStyles += "bg-white text-blue-500 border border-blue-500 hover:bg-blue-100";
          }

          return (
            <button
              key={index}
              onClick={() => !isAnswered && handleAnswerSelection(option)}
              className={buttonStyles}
              disabled={isAnswered}
            >
              {option}
            </button>
          );
        })}
      </div>

      <div className="mt-4 flex space-x-3">
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

      <div className="mt-4 text-lg font-semibold text-indigo-700">
        Current Score: {score} / {quiz.questions.length}
      </div>
    </div>
  );
}

export default Quiz;


// import React, { useState } from "react";
// import { Link } from "react-router-dom"; // Import Link for navigation

// function Quiz({ quiz, finishQuiz }) {
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [score, setScore] = useState(0);
//   const [selectedOption, setSelectedOption] = useState("");
//   const [isAnswered, setIsAnswered] = useState(false);
//   const [markedQuestions, setMarkedQuestions] = useState(new Set());
//   const [flaggedQuestions, setFlaggedQuestions] = useState(new Set());
//   const [skippedQuestions, setSkippedQuestions] = useState(new Set());
//   const [answeredQuestions, setAnsweredQuestions] = useState(new Set());
//   const [showCompletionPrompt, setShowCompletionPrompt] = useState(false);

//   const handleAnswerSelection = (option) => {
//     setSelectedOption(option);
//     setIsAnswered(true);
//     if (option === quiz.questions[currentQuestion].answer) {
//       setScore(score + 1);
//     }
//     setAnsweredQuestions((prev) => new Set(prev).add(currentQuestion));
//   };

//   const handleNext = () => {
//     if (currentQuestion + 1 < quiz.questions.length) {
//       setCurrentQuestion(currentQuestion + 1);
//     } else {
//       checkCompletion();
//     }
//     resetQuestionState();
//   };

//   const resetQuestionState = () => {
//     setSelectedOption("");
//     setIsAnswered(false);
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

//   return (
//     <div className="flex flex-col items-center p-5 space-y-6 bg-gray-50 shadow-md rounded-md">
//       <h3 className="text-2xl font-bold text-blue-600">{quiz.title}</h3>

//       {/* Home Button */}
//       <Link
//         to="/"
//         className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200 self-start mb-4"
//       >
//         Home
//       </Link>

//       <div className="flex space-x-2">
//         {quiz.questions.map((_, index) => (
//           <button
//             key={index}
//             onClick={() => setCurrentQuestion(index)}
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

//       <p className="text-lg font-semibold">{quiz.questions[currentQuestion].question}</p>

//       <div className="grid grid-cols-2 gap-4">
//         {quiz.questions[currentQuestion].options.map((option, index) => {
//           let buttonStyles =
//             "p-3 rounded-md font-medium transition-colors duration-200 ";

//           if (isAnswered) {
//             if (option === quiz.questions[currentQuestion].answer) {
//               buttonStyles += "bg-green-500 text-white";
//             } else if (option === selectedOption) {
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
//               onClick={() => !isAnswered && handleAnswerSelection(option)}
//               className={buttonStyles}
//               disabled={isAnswered}
//             >
//               {option}
//             </button>
//           );
//         })}
//       </div>

//       <div className="flex space-x-2">
//         <button onClick={handleSkip} className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600">
//           Skip
//         </button>
//         <button onClick={handleMark} className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600">
//           Mark
//         </button>
//         <button onClick={handleFlag} className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
//           Flag
//         </button>
//         <button
//           onClick={handleNext}
//           className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
//         >
//           {currentQuestion + 1 === quiz.questions.length ? "Finish" : "Next"}
//         </button>
//       </div>

//       {showCompletionPrompt && (
//         <div className="mt-4 p-4 bg-yellow-100 border border-yellow-500 rounded">
//           <p className="text-yellow-600">
//             You have unanswered questions. Please address all questions before finishing the quiz.
//           </p>
//           <button
//             onClick={() => setShowCompletionPrompt(false)}
//             className="mt-2 px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
//           >
//             Okay
//           </button>
//         </div>
//       )}

//       {/* Button to go back to home page */}
//       <Link
//         to="/"
//         className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
//       >
//         Go to Home
//       </Link>
//     </div>
//   );
// }

// export default Quiz;

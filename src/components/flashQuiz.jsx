import { useState } from "react";
import { ProgressBar } from "./progressBar";
import { flashcardsData } from "../data/flashcards";

export const FlashcardQuiz = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [answered, setAnswered] = useState([]);

  const currentFlashcard = flashcardsData[currentIndex];
  const isAnswered = answered.includes(currentIndex);

  const handleNext = () => {
    if (currentIndex < flashcardsData.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowAnswer(false);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setShowAnswer(false);
    }
  };

  const handleAnswered = () => {
    if (!isAnswered) {
      setAnswered([...answered, currentIndex]);
    }
    setShowAnswer(true);
  };

  const handleQuizComplete = () => {
    setCurrentIndex(0);
    setShowAnswer(false);
    setAnswered([]);
  };

  const isQuizComplete = currentIndex === flashcardsData.length - 1 && isAnswered;

  return (
    <div className="quiz-container">
      <h1 className="quiz-title">📚 Flashcard Quiz</h1>
      
      <ProgressBar 
        current={currentIndex + 1} 
        total={flashcardsData.length} 
      />

      <div className="flashcard">
        <div className="flashcard-inner">
          <div className="flashcard-content">
            {!showAnswer ? (
              <div className="question-section">
                <h2 className="section-label">Question</h2>
                <p className="flashcard-text">{currentFlashcard.question}</p>
              </div>
            ) : (
              <div className="answer-section">
                <h2 className="section-label">Answer</h2>
                <p className="flashcard-text">{currentFlashcard.answer}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="button-group">
        {!showAnswer ? (
          <button 
            onClick={handleAnswered} 
            className="btn btn-primary"
          >
            Show Answer
          </button>
        ) : (
          <button 
            onClick={handleNext} 
            className="btn btn-success"
            disabled={currentIndex === flashcardsData.length - 1}
          >
            {currentIndex === flashcardsData.length - 1 ? "Last Card" : "Next"}
          </button>
        )}
      </div>

      <div className="nav-buttons">
        <button 
          onClick={handlePrevious} 
          className="btn btn-secondary"
          disabled={currentIndex === 0}
        >
          ← Previous
        </button>
        <button 
          onClick={handleNext} 
          className="btn btn-secondary"
          disabled={currentIndex === flashcardsData.length - 1}
        >
          Next →
        </button>
      </div>

      {isQuizComplete && (
        <div className="completion-message">
          <h2>🎉 Quiz Complete!</h2>
          <p>You answered {answered.length} out of {flashcardsData.length} questions</p>
          <button 
            onClick={handleQuizComplete} 
            className="btn btn-primary"
          >
            Restart Quiz
          </button>
        </div>
      )}
    </div>
  );
};
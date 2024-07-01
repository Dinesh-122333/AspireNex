import React, { useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import "../App.css";

export default function StaffPage() {
  const [testId, setTestId] = useState("");
  const [testTitle, setTestTitle] = useState("");
  const [questions, setQuestions] = useState([{ question: "", options: ["", "", ""], correctAnswers: [0] }]);
  
  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options[optionIndex] = value;
    setQuestions(newQuestions);
  };

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      { question: "", options: ["", "", ""], correctAnswers: [0] }
    ]);
  };

  const handleRemoveQuestion = (questionIndex) => {
    const newQuestions = [...questions];
    newQuestions.splice(questionIndex, 1);
    setQuestions(newQuestions);
  };

  const handleCorrectAnswerToggle = (questionIndex, optionIndex) => {
    const newQuestions = [...questions];
    const currentCorrectAnswers = newQuestions[questionIndex].correctAnswers;
    const index = currentCorrectAnswers.indexOf(optionIndex);
    if (index === -1) {
      newQuestions[questionIndex].correctAnswers.push(optionIndex);
    } else {
      newQuestions[questionIndex].correctAnswers.splice(index, 1);
    }
    setQuestions(newQuestions);
  };

  const handleTestIdSubmit = async (event) => {
    event.preventDefault();
    const questionsData = {
      testId,
      testTitle,
      questions,
    };
    try {
      await axios.post("http://localhost:5000/api/tests", questionsData);
      alert("Questions added successfully!");
      // Reset form fields after successful submission
      setTestId("");
      setTestTitle("");
      setQuestions([{ question: "", options: ["", "", ""], correctAnswers: [0] }]);
    } catch (error) {
      console.error("Error adding questions:", error);
      // Handle error (e.g., show error message to user)
    }
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="shadow p-4 question-bg rounded mx-5 my-3">
              <form onSubmit={handleTestIdSubmit}>
                <div className="mb-3">
                  <label htmlFor="testIdInput" className="form-label">
                    <h4 className="primary-font">Test ID:</h4>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="testIdInput"
                    value={testId}
                    onChange={(e) => setTestId(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="testTitleInput" className="form-label">
                    <h4 className="primary-font">Test Title:</h4>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="testTitleInput"
                    value={testTitle}
                    onChange={(e) => setTestTitle(e.target.value)}
                    required
                  />
                </div>
                
                {questions.map((q, questionIndex) => (
                  <div key={questionIndex} className="mb-4">
                    <label htmlFor={`questionInput${questionIndex}`} className="form-label">
                      Question {questionIndex + 1}:
                    </label>
                    <textarea
                      type="text"
                      className="form-control mb-2"
                      id={`questionInput${questionIndex}`}
                      value={q.question}
                      onChange={(e) => {
                        const newQuestions = [...questions];
                        newQuestions[questionIndex].question = e.target.value;
                        setQuestions(newQuestions);
                      }}
                      required
                    />
                    <label className="form-label">Options:</label>
                    {q.options.map((opt, optionIndex) => (
                      <div key={optionIndex} className="input-group mb-3">
                        <input
                          type="text"
                          className="form-control"
                          value={opt}
                          onChange={(e) => handleOptionChange(questionIndex, optionIndex, e.target.value)}
                          required
                        />
                        <button
                          type="button"
                          className={`btn ${q.correctAnswers.includes(optionIndex) ? "btn-success" : "btn-secondary"}`}
                          onClick={() => handleCorrectAnswerToggle(questionIndex, optionIndex)}
                        >
                          {q.correctAnswers.includes(optionIndex) ? "Correct" : "Incorrect"}
                        </button>
                      </div>
                    ))}
                    <div className="d-flex justify-content-between">
                      <button
                        type="button"
                        className="btn btn-outline-danger"
                        onClick={() => handleRemoveQuestion(questionIndex)}
                      >
                        Remove Question
                      </button>
                      <button
                        type="button"
                        className="staff-addquestion-btn py-2 px-4 rounded-pill"
                        onClick={handleAddQuestion}
                      >
                        Add Question
                      </button>
                    </div>
                  </div>
                ))}

                <div className="text-center mt-3">
                  <button
                    type="submit"
                    className="staff-addquestion-submit-btn border-success border rounded-pill px-3 py-2"
                  >
                    Submit Test
                  </button>
                </div>
                
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

import React, { useState } from "react";
import img from "../assets/student.svg";
import tick from "../assets/tick.jpg"
import axios from "axios";
import Navbar from "./Navbar";
import "../App.css"

export default function StudentPage() {
  const [email, setEmail] = useState("");
  const [testId, setTestId] = useState("");
  const [password, setPassword] = useState("");
  const [testData, setTestData] = useState(null);
  const [error, setError] = useState(null);
  const [attendingTest, setAttendingTest] = useState(false); // New state to track if attending test

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(`http://localhost:5000/api/tests/${testId}`);
      setTestData(response.data);
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error("Error fetching test:", error);
      setError("Failed to fetch test. Please check the test ID.");
      setTestData(null); // Clear test data on error
    }
  };

  const handleAttendTest = (event) => {
    event.preventDefault();
    setAttendingTest(true); // Set attendingTest to true when attending the test
    // Additional logic to handle attending the test can be added here
    // For now, let's log the test data
    console.log("Attending test:", testData);
  };

  function onhandleBack(){
    avigate("/")
  }
  return (
    <>
      <Navbar />
      <div className="container d-flex justify-content-center align-items-center">
        <div className="row w-100">
          <div className="col-md-6 d-flex flex-column align-items-center">
            <div className="m-5 w-100">
              <h1 className="primary-font py-3 text-center">Student</h1>
              <form onSubmit={handleFormSubmit}>
                <div className="form-floating mb-3">
                  <input
                    type="email"
                    className="form-control"
                    id="floatingInput"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <label htmlFor="floatingInput">Email address</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingTestId"
                    placeholder="test id"
                    value={testId}
                    onChange={(e) => setTestId(e.target.value)}
                    required
                  />
                  <label htmlFor="floatingTestId">Test Id</label>
                </div>
                <div className="form-floating">
                  <input
                    type="password"
                    className="form-control"
                    id="floatingPassword"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <label htmlFor="floatingPassword">Password</label>
                </div>
                <button type="submit" className="my-5 student-button w-100">
                  Submit
                </button>
              </form>
            </div>
          </div>
          <div className="col-md-6 d-flex justify-content-center align-items-center">
            <img src={img} className="img-fluid" alt="Student illustration" />
          </div>

        </div>
        
      </div>
      {error && <p className="text-danger">{error}</p>}
              {testData && !attendingTest && (
                <div className="my-4 mx-5 d-flex justify-content-center align-items-center flex-column my-5 ">
                  <h2 className="primary-font mb-3">{testData.testTitle}</h2>
                  {/* Display test questions and options here */}
                  {testData.questions.map((question, index) => (
                    <div key={index} className="mb-4">
                      <h5>{`Question ${index + 1}: ${question.questionText}`}</h5>
                      
                        {question.options.map((option, optionIndex) => (
                          <div class="form-check" key={optionIndex}>
                          <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>
                          <label class="form-check-label" for="flexRadioDefault1">
                          {option.text}
                          </label>
                        </div>
                          
                        ))}
                      
                    </div>
                  ))}
                  <button
                    className="staff-addquestion-submit-btn rounded-pill px-3 py-2 border-success"
                    onClick={handleAttendTest}
                  >
                    Complete
                  </button>
                </div>
              )}
              {attendingTest && (
                <div className="my-5">
                  <div className="d-flex justify-content-center align-items-center flex-column my-5 vh-100" >
                  <h3 className="text-center primary-font">Thank you for attending the test</h3>
                  <img src={tick} className="w-25" alt="" />
                  <button onClick={onhandleBack} className="mt-3 staff-addquestion-submit-btn rounded-pill px-3 py-2 border-success">back</button>
                </div>
                </div>
                
              
              )}
    </>
  );
}

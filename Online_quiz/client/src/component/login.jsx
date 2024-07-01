import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import img from "../assets/login.svg";
import "../App.css";
import Navbar from "./Navbar";

export default function Login() {
  const [isStaff, setIsStaff] = useState(false);
  const [isStudent, setIsStudent] = useState(false);
  const [isRegi, setIsRegi] = useState(false);
  const [isLogi, setIsLogi] = useState(true);
  const [userType, setUserType] = useState(""); // 'student' or 'staff'
  const navigate = useNavigate();

  function handleStudent() {
    setIsStudent(true);
    setIsStaff(false);
  }

  function handleStaff() {
    setIsStaff(true);
    setIsStudent(false);
  }

  function Register() {
    setIsRegi(true);
    setIsLogi(false);
  }

  function Login() {
    setIsLogi(true);
    setIsRegi(false);
  }

  function handleRegisterSubmit(event) {
    event.preventDefault();
    // Handle registration form submission
    console.log("User registered as:", userType);
  }

  function handleLoginSubmit(event) {
    event.preventDefault();
    // Handle login form submission
    if (isStudent) {
      navigate("/student");
    } else if (isStaff) {
      navigate("/staff");
    }
  }

  function onDashboard(){
    navigate("/sdash")
  }
  return (
    <>
    <Navbar/>
      {isLogi && (
        <div className="row">
          <div className="col-md-6">
            <img src={img} className="" alt="" />
          </div>
          <div className="col-md-5 mx-5 ">
            <div className="border border-3 border-success rounded py-5 my-5 login-background mx-5">
              <div className="container text-center ">
                <p className="display-6 primary-font">Quiz Maker</p>
                <div className="d-flex flex-column align-items-center py-3">
                  <p
                    className="border border-success login-button rounded-pill my-2 px-3 py-2"
                    style={{ cursor: "pointer" }}
                    onClick={handleStudent}
                  >
                    Student
                  </p>
                  {isStudent && (
                    <form onSubmit={handleLoginSubmit} className="mt-4">
                      <input
                        type="email"
                        placeholder="Email"
                        className="form-control my-2"
                      />
                      <input
                        type="password"
                        placeholder="Password"
                        className="form-control my-2"
                      />
                      <button
                        type="submit"
                        className="mt-2 staffandstudent-login-button px-3 py-1 rounded-pill"
                      >
                        Login
                      </button>
                    </form>
                  )}
                  <p className="my-2">or</p>
                  <p
                    className="border border-success login-button rounded-pill my-2 px-3 py-2"
                    style={{ cursor: "pointer" }}
                    onClick={handleStaff}
                  >
                    Staff
                  </p>
                  {isStaff && (
                    <form onSubmit={handleLoginSubmit} className="mt-4">
                      <input
                        type="email"
                        placeholder="Email"
                        className="form-control my-2"
                      />
                      <input
                        type="password"
                        placeholder="Password"
                        className="form-control my-2"
                      />
                      <button
                        type="submit"
                        className="mt-2 staffandstudent-login-button px-3 py-1 rounded-pill me-3"
                      >
                        Make Questions
                      </button>
                      <button
                        type="submit"
                        onClick={onDashboard}
                        className="mt-2 staffandstudent-login-button px-4 py-1 rounded-pill"
                      >
                        Dashbord
                      </button>
                    </form>
                  )}
                </div>
                <p>
                  New user{" "}
                  <span style={{ cursor: "pointer" }} onClick={Register}>
                    Register here!
                  </span>{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {isRegi && (
        <div className="row">
          <div className="col-md-6">
            <img src={img} className="" alt="" />
          </div>
          <div className="col-md-5 mx-5 ">
            <div className="border border-3 border-success rounded py-5 my-5 login-background mx-5">
              <div className="container text-center ">
                <p className="display-6 primary-font">Quiz Maker</p>
                <form
                  onSubmit={handleRegisterSubmit}
                  className="d-flex flex-column align-items-center py-3"
                >
                  <input
                    type="text"
                    placeholder="Name"
                    className="form-control my-2"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    className="form-control my-2"
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    className="form-control my-2"
                  />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    className="form-control my-2"
                  />
                  <select
                    className="form-control my-2"
                    value={userType}
                    onChange={(e) => setUserType(e.target.value)}
                    required
                  >
                    <option value="">Select User Type</option>
                    <option value="student">Student</option>
                    <option value="staff">Staff</option>
                  </select>
                  <button
                    type="submit"
                    className="mt-2 staffandstudent-login-button px-3 py-1 rounded-pill"
                  >
                    Register
                  </button>
                </form>
                <p>
                  Already registered?{" "}
                  <span style={{ cursor: "pointer" }} onClick={Login}>
                    Login here!
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

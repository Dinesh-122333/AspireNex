import React from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  function handlePress() {
    navigate("/");
  }

  return (
    <nav className="navbar">
      <div className="px-3 py-3">
        <h3 className="primary-font" onClick={handlePress} style={{ cursor: "pointer" }}>
          Quiz Maker
        </h3>
      </div>
    </nav>
  );
}

import React from "react";
import Navbar from "../components/Navbar";
import "../index.css";

function Welcome() {
  return (
    <>
      <Navbar />
      <div className="container">
        <h1>Welcome to Dementica</h1>
        <p>Early Dementia Risk Screening for Healthcare Professionals</p>
      </div>
    </>
  );
}

export default Welcome;

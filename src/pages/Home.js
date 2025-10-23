import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

function Home() {
  const [doctorSurname, setDoctorSurname] = useState("");

  useEffect(() => {
    const fullName = localStorage.getItem("doctorFullName");
    if (fullName) {
      const nameParts = fullName.trim().split(" ");
      const lastName = nameParts[nameParts.length - 1];
      setDoctorSurname(lastName);
    }
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, #e6f0ff, #ffffff)",
        fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
      }}
    >
      <Navbar />
      <div
        style={{
          padding: "4rem",
          textAlign: "center",
          color: "#1e4d92",
        }}
      >
        <h1>Hello, Dr. {doctorSurname || "User"}</h1>
        <p>Welcome to the NeuroMind System Web Portal.</p>
      </div>
    </div>
  );
}

export default Home;

import React from "react";
import Navbar from "../components/Navbar";
import "../index.css";

function Home() {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const surname = user?.name ? user.name.split(" ").slice(-1)[0] : "Doctor";

  return (
    <>
      <Navbar />
      <div className="container">
        <h1>Welcome, Dr. {surname}</h1>
        <p>This is your dashboard. Use the navigation bar above to view patients, reports, or news.</p>
      </div>
    </>
  );
}

export default Home;

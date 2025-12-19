import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../index.css";

function TestPage() {
  const { testId } = useParams();
	console.log(testId);
  const sessionUser = JSON.parse(sessionStorage.getItem("user"));
  const idToken = sessionUser?.IdToken;

  const [test, setTest] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!idToken) return;

    const loadTest = async () => {
      try {
        const res = await fetch(
          `http://dementica.danigoes.online/v1/user_service.UserService/GetTestResultDetails`,
		{
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ id_token: idToken, test_id: testId }),
		}

        );

        if (!res.ok) throw new Error("Failed to load test details");

        const data = await res.json();
        setTest(data.test || {});
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    loadTest();
  }, [idToken, testId]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="container">Loading test...</div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="container error">{error}</div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="card">
          <h2>Test ID: {testId}</h2>
          <p><strong>User ID:</strong> {test.UserID}</p>
          <p><strong>Type:</strong> {test.Type}</p>
          <p><strong>Risk Score:</strong> {test.RiskScore}</p>
          <p><strong>Date:</strong> {test.Date || "N/A"}</p>

          <h3 style={{ marginTop: "1.5rem" }}>Data</h3>
          <div className="grid">
            {test.Data
              ? test.Data.split(",").map((item, idx) => {
                  const [key, value] = item.split(":");
                  return (
                    <div key={idx} className="field">
                      <label>{key.trim()}</label>
                      <input value={value?.trim() || ""} disabled />
                    </div>
                  );
                })
              : <p>No test data available.</p>}
          </div>
        </div>
      </div>
    </>
  );
}

export default TestPage;


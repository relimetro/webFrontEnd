import React, { useEffect, useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../index.css";

function UserPage() {
  const { uid } = useParams();
  const sessionUser = JSON.parse(sessionStorage.getItem("user"));
  const idToken = sessionUser?.IdToken;

  const [viewerType, setViewerType] = useState("");
  const [userDetails, setUserDetails] = useState({});
  const [editableDetails, setEditableDetails] = useState({});
  const [tableItems, setTableItems] = useState([]);
  const [tableType, setTableType] = useState("tests"); // "tests" or "patients"
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [sortKey, setSortKey] = useState("date");
  const [sortDir, setSortDir] = useState("desc");

  const canEditField = (key) => {
    if (viewerType === "Admin") return true;
    if (viewerType === "Doctor" && userDetails.Type === "Patient") {
      return ["RiskScore", "HasDementia"].includes(key);
    }
    return uid === sessionUser.uid;
  };

  // ---------- Fetch viewer type ----------
  useEffect(() => {
    if (!idToken) return;
    const loadViewerType = async () => {
      try {
        const res = await fetch(
          `http://dementica.danigoes.online/v1/user_service.UserService/GetUserDetails?id_token=${idToken}`
        );
        if (!res.ok) throw new Error("Failed to fetch viewer type");
        const data = await res.json();
        setViewerType(data.details?.Type || "User");
      } catch {
        setViewerType(sessionUser.UserType || "User");
      }
    };
    loadViewerType();
  }, [idToken]);

  // ---------- Fetch user details ----------
  useEffect(() => {
    if (!idToken) return;

    const loadUserDetails = async () => {
      try {
        const res = await fetch(
          `http://dementica.danigoes.online/v1/user_service.UserService/GetUserDetails?id_token=${idToken}&target_uid=${uid}`
        );
        if (!res.ok) throw new Error("Failed to fetch user details");
        const data = await res.json();
        setUserDetails(data.details || {});
        setEditableDetails(data.details || {});
      } catch (err) {
        setError(err.message);
      }
    };

    loadUserDetails();
  }, [idToken, uid]);

  // ---------- Load table data ----------
  useEffect(() => {
    if (!idToken || !userDetails.Type) return;

    const loadTableData = async () => {
      setLoading(true);
      try {
        if (userDetails.Type === "Doctor") {
          // Get linked users
          const linkedRes = await fetch(
            "http://dementica.danigoes.online/v1/user_service.UserService/GetLinkedUsers",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ id_token: idToken }),
            }
          );
          if (!linkedRes.ok) throw new Error("Failed to fetch linked users");
          const linkedData = await linkedRes.json();

          // Get details of each linked user and filter patients
          const patients = [];
          for (const user of linkedData.relatedUsers || []) {
            try {
              const res = await fetch(
                `http://dementica.danigoes.online/v1/user_service.UserService/GetUserDetails?id_token=${idToken}&target_uid=${user.uid}`
              );
              if (!res.ok) continue;
              const data = await res.json();
              if (data.details?.DoctorID === uid) {
                patients.push({
                  uid: user.uid,
                  name: data.details?.Name || "Unknown",
                  riskScore: data.details?.RiskScore || "N/A",
                });
              }
            } catch {}
          }

          setTableItems(patients);
          setTableType("patients");
        } else {
          // Non-doctor → fetch tests
          const res = await fetch(
            "http://dementica.danigoes.online/v1/user_service.UserService/GetUserTestResults",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ id_token: idToken, target_uid: uid }),
            }
          );
          if (!res.ok) throw new Error("Failed to load tests");
          const data = await res.json();
          setTableItems(data.tests || []);
          setTableType("tests");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadTableData();
  }, [idToken, userDetails, uid]);

  const saveChanges = async () => {
    try {
      const payload = {};
      Object.keys(editableDetails).forEach((k) => {
        if (editableDetails[k] !== userDetails[k] && canEditField(k)) {
          payload[k] = editableDetails[k];
        }
      });
      if (!Object.keys(payload).length) return;

      const res = await fetch(
        "http://dementica.danigoes.online/v1/user_service.UserService/AddUserDetails",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id_token: idToken, uid, details: payload }),
        }
      );
      if (!res.ok) throw new Error("Save failed");
      setUserDetails({ ...userDetails, ...payload });
      alert("Changes saved");
    } catch (err) {
      alert(err.message);
    }
  };

  const sortedItems = useMemo(() => {
    return [...tableItems].sort((a, b) => {
      const v1 = a[sortKey] || "";
      const v2 = b[sortKey] || "";
      if (typeof v1 === "string" && typeof v2 === "string") {
        return sortDir === "asc" ? v1.localeCompare(v2) : v2.localeCompare(v1);
      }
      return sortDir === "asc" ? v1 - v2 : v2 - v1;
    });
  }, [tableItems, sortKey, sortDir]);

  if (error)
    return (
      <>
        <Navbar />
        <div className="container error">{error}</div>
      </>
    );

  if (loading)
    return (
      <>
        <Navbar />
        <div className="container">Loading user data...</div>
      </>
    );

  return (
    <>
      <Navbar />
      <div className="container">
        {/* ================= USER DETAILS ================= */}
        <div className="card">
          <h2>{userDetails.Name || "User"}</h2>
          <p>
            <strong>UID:</strong> {uid}
          </p>
          <p>
            <strong>Role:</strong> {userDetails.Type}
          </p>

          <div className="grid">
            {Object.entries(editableDetails).map(([key, value]) => (
              <div key={key} className="field">
                <label>{key}</label>
                <input
                  value={value}
                  disabled={!canEditField(key)}
                  onChange={(e) =>
                    setEditableDetails({
                      ...editableDetails,
                      [key]: e.target.value,
                    })
                  }
                />
              </div>
            ))}
          </div>

          <button className="button" onClick={saveChanges}>
            Save Changes
          </button>
        </div>

        {/* ================= TABLE ================= */}
        <h3 style={{ marginTop: "2rem" }}>
          {tableType === "patients" ? "Patients" : "Test Results"}
        </h3>

        <div className="table-controls">
          <select onChange={(e) => setSortKey(e.target.value)} value={sortKey}>
            {tableType === "patients" ? (
              <>
                <option value="name">Name</option>
                <option value="riskScore">Risk Score</option>
              </>
            ) : (
              <>
                <option value="type">Type</option>
                <option value="riskScore">Risk Score</option>
                <option value="date">Date</option>
              </>
            )}
          </select>

          <select
            onChange={(e) => setSortDir(e.target.value)}
            value={sortDir}
          >
            <option value="desc">Desc</option>
            <option value="asc">Asc</option>
          </select>
        </div>

        <table className="table">
          <thead>
            <tr>
              {tableType === "patients" ? (
                <>
                  <th>Name</th>
                  <th>Risk Score</th>
                  <th>Action</th>
                </>
              ) : (
                <>
                  <th>Type</th>
                  <th>Risk</th>
                  <th>Date</th>
                  <th>Action</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {sortedItems.map((item) => (
              <tr key={item.uid || item.test_id}>
                {tableType === "patients" ? (
                  <>
                    <td>{item.name}</td>
                    <td>{item.riskScore}</td>
                    <td>
                      <Link to={`/users/${item.uid}`}>View</Link>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{item.type}</td>
                    <td>{item.riskScore}</td>
                    <td>{item.date}</td>
                    <td>
                      <Link to={`/tests/${item.testId}`}>View</Link>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default UserPage;


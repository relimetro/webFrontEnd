import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../index.css";

function Home() {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const idToken = user?.IdToken;
  const userUid = user?.UserID;


  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");
  const handleSort = (field) => {
	if (sortField === field) {
	  setSortDirection(sortDirection === "asc" ? "desc" : "asc");
	} else {
	  setSortField(field);
	  setSortDirection("asc");
	}
  };

  const getRiskColor = (score) => {
	const n = parseFloat(score);
	if (isNaN(n)) return "#999";
	if (n < 0.3) return "green";
	if (n < 0.6) return "orange";
	return "red";
  };
  
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!idToken) {
      setError("Not authenticated");
      setLoading(false);
      return;
    }

    const fetchDashboardData = async () => {
      try {
        // 1️⃣ Get own user details
        const selfRes = await fetch(
          `http://dementica.danigoes.online/v1/user_service.UserService/GetUserDetails?id_token=${idToken}`
        );

        if (!selfRes.ok) throw new Error("Failed to load user details");
        const selfData = await selfRes.json();

        setName(selfData.details?.Name || "User");
        setRole(selfData.details?.Type || "Doctor");

        // 2️⃣ Get linked users (patients OR all users if admin)
        const linkedRes = await fetch(
          "http://dementica.danigoes.online/v1/user_service.UserService/GetLinkedUsers",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id_token: idToken }),
          }
        );

        if (!linkedRes.ok) throw new Error("Failed to load users");
        const linkedData = await linkedRes.json();

        // 3️⃣ Fetch details for each returned user
        const detailedUsers = await Promise.all(
          (linkedData.relatedUsers || []).map(async (u) => {
            const res = await fetch(
              `http://dementica.danigoes.online/v1/user_service.UserService/GetUserDetails?id_token=${idToken}&target_uid=${u.uid}`
            );

            if (!res.ok) return null;
            const data = await res.json();

            return {
              uid: u.uid,
              name: data.details?.Name || "Unknown",
              riskScore: data.details?.RiskScore || "N/A",
              type: data.details?.Type || "Unknown",
            };
          })
        );

        setUsers(detailedUsers.filter(Boolean));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [idToken]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="container">Loading dashboard...</div>
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

const filteredUsers = users
  .filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  )
  .sort((a, b) => {
    const aVal = a[sortField] ?? "";
    const bVal = b[sortField] ?? "";

    if (aVal < bVal) return sortDirection === "asc" ? -1 : 1;
    if (aVal > bVal) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });



  const isAdmin = role === "Admin";

  return (
    <>
      <Navbar />
      <div className="container">
        <h1>Welcome, {name}</h1>
        <p><strong>{role} ID:</strong> {userUid}</p>

        <h2 style={{ marginTop: "2rem" }}>
          {isAdmin ? "Users" : "Your Patients"}
        </h2>
		<div style={{ marginBottom: "1rem", display: "flex", gap: "1rem" }}>
		  <input
			type="text"
			placeholder="Search by name…"
			value={search}
			onChange={(e) => setSearch(e.target.value)}
			className="input"
			style={{ maxWidth: "300px" }}
		  />
		</div>

        {users.length === 0 ? (
          <p>No users found.</p>
        ) : (
          <table className="pretty-table">
  <thead>
    <tr>
      <th onClick={() => handleSort("name")}>
        Name {sortField === "name" && (sortDirection === "asc" ? "▲" : "▼")}
      </th>

      {isAdmin ? (
        <th onClick={() => handleSort("type")}>
          Role {sortField === "type" && (sortDirection === "asc" ? "▲" : "▼")}
        </th>
      ) : (
        <th onClick={() => handleSort("riskScore")}>
          Risk {sortField === "riskScore" && (sortDirection === "asc" ? "▲" : "▼")}
        </th>
      )}

      <th>Action</th>
    </tr>
  </thead>
  <tbody>
    {filteredUsers.map((u) => (
      <tr key={u.uid}>
        <td>{u.name}</td>

        {isAdmin ? (
          <td>
            <span className={`badge badge-${u.type?.toLowerCase()}`}>
              {u.type}
            </span>
          </td>
        ) : (
          <td style={{ color: getRiskColor(u.riskScore), fontWeight: "bold" }}>
            {u.riskScore}
          </td>
        )}

        <td>
          <Link className="link-button" to={`/users/${u.uid}`}>
            View
          </Link>
        </td>
      </tr>
    ))}
  </tbody>
</table>

        )}
      </div>
    </>
  );
}

export default Home;


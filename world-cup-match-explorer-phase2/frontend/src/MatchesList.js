import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_BASE = "http://localhost:3001/api/v1";

export default function MatchesList() {
  const [matches, setMatches] = useState([]);
  const [stageFilter, setStageFilter] = useState("");
  const [teamFilter, setTeamFilter] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const token = localStorage.getItem("token");

  let userRole = null;

  // Decode JWT to read role
  if (token) {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      userRole = payload.role;
    } catch {}
  }

  // -----------------------------------------------------
  // LOAD MATCHES
  // -----------------------------------------------------
  useEffect(() => {
    const loadMatches = async () => {
      try {
        const res = await fetch(`${API_BASE}/matches`);
        const data = await res.json();

        if (!res.ok) {
          setError(data?.error?.message || "Error loading matches.");
          return;
        }

        setMatches(data.data);
      } catch {
        setError("Server error loading matches.");
      }
    };

    loadMatches();
  }, []);

  // -----------------------------------------------------
  // DELETE MATCH (ADMIN ONLY)
  // -----------------------------------------------------
  const handleDelete = async (id) => {
    if (userRole !== "admin") {
      alert("Only admins can delete matches.");
      return;
    }

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this match?"
    );

    if (!confirmDelete) return;

    try {
      const res = await fetch(`${API_BASE}/matches/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data?.error?.message || "Error deleting match.");
        return;
      }

      setMatches(matches.filter((m) => m._id !== id));
      setSuccess("Match deleted successfully!");
    } catch {
      setError("Server error while deleting.");
    }
  };

  // -----------------------------------------------------
  // FILTER LOGIC
  // -----------------------------------------------------
  const filteredMatches = matches.filter((m) => {
    const stageOk = stageFilter ? m.stage === stageFilter : true;

    const teamOk = teamFilter
      ? m.home.toLowerCase().includes(teamFilter.toLowerCase()) ||
        m.away.toLowerCase().includes(teamFilter.toLowerCase())
      : true;

    return stageOk && teamOk;
  });

  const allStages = [
    "Group Stage",
    "Round of 16",
    "Quarter-finals",
    "Semi-finals",
    "Final",
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h2>All Matches</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}

      {/* ---------------- FILTERS ---------------- */}
      <div style={{ marginBottom: "20px" }}>
        <label>Filter by Stage:</label>
        <select
          value={stageFilter}
          onChange={(e) => setStageFilter(e.target.value)}
          style={{ marginLeft: "10px", marginRight: "20px" }}
        >
          <option value="">All</option>
          {allStages.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        <label>Filter by Team:</label>
        <input
          type="text"
          placeholder="Team name..."
          value={teamFilter}
          onChange={(e) => setTeamFilter(e.target.value)}
          style={{ marginLeft: "10px" }}
        />
      </div>

      {/* ADD NEW BUTTON — visible to ADMIN ONLY */}
      {userRole === "admin" && (
        <Link
          to="/matches/new"
          style={{
            display: "inline-block",
            marginBottom: "20px",
            padding: "10px",
            background: "black",
            color: "white",
          }}
        >
          + Add New Match
        </Link>
      )}

      {/* ---------------- TABLE ---------------- */}
      <table
        border="1"
        cellPadding="10"
        style={{ borderCollapse: "collapse", width: "100%" }}
      >
        <thead>
          <tr>
            <th>Year</th>
            <th>Stage</th>
            <th>Home</th>
            <th>Away</th>
            <th>Score</th>
            {userRole === "admin" && <th>Actions</th>}
          </tr>
        </thead>

        <tbody>
          {filteredMatches.map((match) => (
            <tr key={match._id}>
              <td>{match.year}</td>
              <td>{match.stage}</td>
              <td>{match.home}</td>
              <td>{match.away}</td>
              <td>{match.score}</td>

              {/* ACTION BUTTONS ONLY FOR ADMIN */}
              {userRole === "admin" && (
                <td>
                  <Link
                    to={`/matches/${match._id}/edit`}
                    style={{
                      marginRight: "10px",
                      padding: "5px",
                      background: "blue",
                      color: "white",
                    }}
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => handleDelete(match._id)}
                    style={{
                      padding: "5px",
                      background: "red",
                      color: "white",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                </td>
              )}
            </tr>
          ))}

          {filteredMatches.length === 0 && (
            <tr>
              <td colSpan="6" style={{ textAlign: "center", padding: "20px" }}>
                No matches found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

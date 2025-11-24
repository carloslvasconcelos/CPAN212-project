import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function MatchesList() {
  const [matches, setMatches] = useState([]);
  
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const loadMatches = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/v1/matches");
        const data = await response.json();

        if (!response.ok) {
          setError("Error loading matches.");
          return;
        }

        setMatches(data.data);  
      } catch (err) {
        setError("Server error.");
      }
    };

    loadMatches();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this match?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:3001/api/v1/matches/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        setError("Error deleting match.");
        return;
      }

      setMatches(matches.filter((m) => m._id !== id));
      setSuccess("Match deleted successfully!");
    } catch (err) {
      setError("Server error.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>All Matches</h2>

      {/* NEW: feedback messages */}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}

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

      {/* List of matches */}
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
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {matches.map((match) => (
            <tr key={match._id}>
              <td>{match.year}</td>
              <td>{match.stage}</td>
              <td>{match.home}</td>
              <td>{match.away}</td>
              <td>{match.score}</td>
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
            </tr>
          ))}

          {matches.length === 0 && (
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

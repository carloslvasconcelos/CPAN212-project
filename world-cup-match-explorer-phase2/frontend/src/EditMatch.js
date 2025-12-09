import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const API_BASE = "http://localhost:3001/api/v1";

export default function EditMatch() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState({
    year: "",
    stage: "",
    home: "",
    away: "",
    score: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ----------------------------
  // CHECK ADMIN PERMISSION
  // ----------------------------
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("You must be logged in as admin.");
      return;
    }

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));

      if (payload.role !== "admin") {
        setError("Only admins can edit matches.");
      }
    } catch (err) {
      setError("Invalid token. Please login again.");
    }
  }, []);

  // ----------------------------
  // LOAD MATCH INFO
  // ----------------------------
  useEffect(() => {
    const loadMatch = async () => {
      try {
        const res = await fetch(`${API_BASE}/matches/${id}`);
        const data = await res.json();

        if (!res.ok) {
          setError(data?.error?.message || "Match not found.");
          return;
        }

        setForm({
          year: data.data.year,
          stage: data.data.stage,
          home: data.data.home,
          away: data.data.away,
          score: data.data.score,
        });
      } catch (err) {
        setError("Server error loading match.");
      }
    };

    loadMatch();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ----------------------------
  // SUBMIT UPDATE
  // ----------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const token = localStorage.getItem("token");

    if (!token) {
      setError("Unauthorized. Please log in.");
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/matches/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data?.error?.message || "Error updating match.");
        return;
      }

      setSuccess("Match updated successfully!");

      setTimeout(() => navigate("/matches"), 1000);
    } catch (err) {
      setError("Server error.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Edit Match</h2>

      {error && (
        <p style={{ color: "red", whiteSpace: "pre-wrap" }}>{error}</p>
      )}

      {success && <p style={{ color: "green" }}>{success}</p>}

      <form onSubmit={handleSubmit} style={{ maxWidth: "400px" }}>
        <label>Year:</label>
        <input
          type="number"
          name="year"
          value={form.year}
          onChange={handleChange}
          required
        />

        <label>Stage:</label>
        <input
          type="text"
          name="stage"
          value={form.stage}
          onChange={handleChange}
          required
        />

        <label>Home Team:</label>
        <input
          type="text"
          name="home"
          value={form.home}
          onChange={handleChange}
          required
        />

        <label>Away Team:</label>
        <input
          type="text"
          name="away"
          value={form.away}
          onChange={handleChange}
          required
        />

        <label>Score:</label>
        <input
          type="text"
          name="score"
          value={form.score}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          style={{
            padding: "10px",
            marginTop: "10px",
            backgroundColor: "black",
            color: "white",
            width: "100%",
          }}
        >
          Update Match
        </button>
      </form>
    </div>
  );
}

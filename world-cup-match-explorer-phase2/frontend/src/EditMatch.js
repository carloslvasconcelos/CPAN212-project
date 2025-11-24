import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditMatch() {
  const navigate = useNavigate();
  const { id } = useParams(); // NEW: gets the match ID from the URL

  const [form, setForm] = useState({
    year: "",
    stage: "",
    home: "",
    away: "",
    score: "",
  });

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  useEffect(() => {
    const loadMatch = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/v1/matches/${id}`
        );
        const data = await response.json();

        if (!response.ok) {
          setError("Match not found.");
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
        setError("Error loading match.");
      }
    };

    loadMatch();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.year || !form.stage || !form.home || !form.away || !form.score) {
      setError("All fields are required.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3001/api/v1/matches/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      if (!response.ok) {
        setError("Error updating match.");
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

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}

      <form onSubmit={handleSubmit} style={{ maxWidth: "400px" }}>

        <label>Year:</label>
        <input
          type="number"
          name="year"
          value={form.year}
          onChange={handleChange}
          required
          style={{ width: "100%", marginBottom: "10px" }}
        />

        <label>Stage:</label>
        <input
          type="text"
          name="stage"
          value={form.stage}
          onChange={handleChange}
          required
          style={{ width: "100%", marginBottom: "10px" }}
        />

        <label>Home Team:</label>
        <input
          type="text"
          name="home"
          value={form.home}
          onChange={handleChange}
          required
          style={{ width: "100%", marginBottom: "10px" }}
        />

        <label>Away Team:</label>
        <input
          type="text"
          name="away"
          value={form.away}
          onChange={handleChange}
          required
          style={{ width: "100%", marginBottom: "10px" }}
        />

        <label>Score:</label>
        <input
          type="text"
          name="score"
          value={form.score}
          onChange={handleChange}
          required
          style={{ width: "100%", marginBottom: "10px" }}
        />

        <button
          type="submit"
          style={{
            padding: "10px",
            backgroundColor: "black",
            color: "white",
            width: "100%",
            cursor: "pointer",
          }}
        >
          Update Match
        </button>
      </form>
    </div>
  );
}

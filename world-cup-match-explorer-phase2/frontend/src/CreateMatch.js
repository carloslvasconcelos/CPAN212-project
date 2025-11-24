import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateMatch() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    year: "",
    stage: "",
    home: "",
    away: "",
    score: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // simple validation
    if (!form.year || !form.stage || !form.home || !form.away || !form.score) {
      setError("All fields are required.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/api/v1/matches", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data?.error?.message || "Error creating match");
        return;
      }

      setSuccess("Match created successfully!");

      // Redirect after 1 second
      setTimeout(() => navigate("/matches"), 1000);
    } catch (err) {
      setError("Server error.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Add New Match</h2>

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
          Create Match
        </button>
      </form>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE = "http://localhost:3001/api/v1";

const STAGES = [
  "Group Stage",
  "Round of 16",
  "Quarter-finals",
  "Semi-finals",
  "Final"
];

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

  // CHECK AUTH + ADMIN ROLE
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("You must be logged in as admin.");
      return;
    }

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));

      if (payload.role !== "admin") {
        setError("Only admins can create new matches.");
      }
    } catch {
      setError("Invalid token. Please login again.");
    }
  }, []);

  // SE NÃO FOR ADMIN — MOSTRA A MENSAGEM E ENCERRA O COMPONENTE
  if (error && error.includes("Only admins")) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  // HANDLE FORM CHANGES
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // HANDLE SUBMIT
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
      const res = await fetch(`${API_BASE}/matches`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data?.error?.message || "Error creating match.");
        return;
      }

      setSuccess("Match created successfully!");
      setTimeout(() => navigate("/matches"), 1000);
    } catch (err) {
      console.error(err);
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
        />

        <label>Stage:</label>
        <select
          name="stage"
          value={form.stage}
          onChange={handleChange}
          required
        >
          <option value="">Select a stage</option>
          {STAGES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

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
            backgroundColor: "black",
            color: "white",
            width: "100%",
            marginTop: "10px",
          }}
        >
          Create Match
        </button>
      </form>
    </div>
  );
}

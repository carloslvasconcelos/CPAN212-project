import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE = "http://localhost:3001/api/v1";

export default function VerifyOtp() {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const email = localStorage.getItem("loginEmail");
    if (!email) {
      setError("Email not found. Please login again.");
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/auth/verify-login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data?.errorMessage || "Invalid OTP.");
        return;
      }

      // save token
      localStorage.setItem("token", data.token);

      setSuccess("OTP verified successfully!");

      setTimeout(() => navigate("/"), 800);
    } catch (err) {
      console.error(err);
      setError("Server error. Try again.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Verify OTP</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}

      <form onSubmit={handleSubmit} style={{ maxWidth: "400px" }}>
        <label>Enter OTP:</label>
        <input
          type="number"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
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
          Verify
        </button>
      </form>
    </div>
  );
}

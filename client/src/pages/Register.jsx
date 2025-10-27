import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"

export default function Register() {
  // Stores user input
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  // Used to disable button during request
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const data = await res.json(); 
      if (!res.ok) {
        throw new Error(data.message || "Registration failed");
      }
      alert("Registered successfully. Please login.");
      navigate("/login");
    } catch (err) {
      alert(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="card">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}

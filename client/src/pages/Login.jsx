import React, { useState, useContext, useEffect } from "react";
import fetchAPI from "../api/fetchAPI";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./Login.css";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const { user, login } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //fetchAPI handles: baseURL, token, JSON, errors
      const res = await fetchAPI("/api/auth/login", {
        method: "POST",
        body: form,
      });

      login({ ...res.user, token: res.token });

      navigate("/");
    } catch (err) {
      alert(err.message || "Login failed");
    }
  };

  return (
    <div className="card">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
/* 
res.user and res.token come from backend response (not directly after some stages happen at the fetchAPI function which is in fetchAPI.js)
we are calling the login function and sharing the data to AuthProvider.jsx
The ... (spread operator) copies all properties from res.user into a new object.Then that object we add new property called token

Step-by-step example
1️⃣ Backend sends this:
res.json({
  token: "abc123",
  user: {
    id: "1",
    name: "Irfad",
    email: "irfad@gmail.com"
  }
});
So the backend response body (JSON) is:
{
  "token": "abc123",
  "user": { "id": "1", "name": "Irfad", "email": "irfad@gmail.com" }
}
2️⃣ Inside your fetchAPI, you have:
const data = await response.json();
return data;
That means the same JSON above is returned to the caller.
3️⃣ In your handleSubmit
const res = await fetchAPI("/api/auth/login", { method: "POST", body: form });
Now after this line, res equals:
{
  token: "abc123",
  user: { id: "1", name: "Irfad", email: "irfad@gmail.com" }
}
4️⃣ Then you use it:
login({ ...res.user, token: res.token });
That expands into:
login({
  id: "1",
  name: "Irfad",
  email: "irfad@gmail.com",
  token: "abc123"
});
✅ So now login() receives all user info plus the token,
and can save it to Context or localStorage for global use.*/

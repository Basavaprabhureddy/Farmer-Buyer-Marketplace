import React, { useState } from "react";
import API from "../api";

export default function Login() {
  const [data, setData] = useState({
    email: "",
    password: "",
    role: ""
  });

  const login = async () => {
    try {
      // ✅ validation
      if (!data.email || !data.password || !data.role) {
        alert("All fields including role are required");
        return;
      }

      const res = await API.post("/auth/login", {
        email: data.email,
        password: data.password
      });

      // ✅ attach role manually
      const userData = {
        ...res.data,
        role: data.role.toUpperCase()
      };

      // ✅ store user
      localStorage.setItem("user", JSON.stringify(userData));

      console.log("Stored User:", userData);

      alert("Login successful");

      // ✅ redirect
      if (userData.role === "FARMER") {
        window.location.href = "/farmer-dashboard";
      } else {
        window.location.href = "/buyer-dashboard";
      }

    } catch (err) {
      console.error("Login Error:", err.response?.data || err.message);
      alert("Login failed");
    }
  };

 return (
  <div className="container">
    <div className="form-container">

      <h2>Login</h2>

      <input
        placeholder="Email"
        value={data.email}
        onChange={e => setData({ ...data, email: e.target.value })}
      />

      <input
        type="password"
        placeholder="Password"
        value={data.password}
        onChange={e => setData({ ...data, password: e.target.value })}
      />

      <select
        value={data.role}
        onChange={e => setData({ ...data, role: e.target.value })}
      >
        <option value="">Select Role</option>
        <option value="FARMER">Farmer</option>
        <option value="BUYER">Buyer</option>
      </select>

      <div className="auth-buttons">
        <button className="login-btn" onClick={login}>
          Login
        </button>

        <button
          className="register-btn"
          onClick={() => window.location.href = "/register"}
        >
          Register
        </button>
      </div>

    </div>
  </div>
);
}
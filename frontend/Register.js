import React, { useState } from "react";
import API from "../api";

export default function Register() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    role: ""   // ✅ ADD THIS
  });

  const register = async () => {
    try {
      if (!data.role) {
        alert("Please select role");
        return;
      }

      await API.post("/auth/register", data);

      alert("Registered successfully");
      window.location.href = "/";
    } catch (err) {
      console.error(err);
      alert("Error");
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>

      <input
        placeholder="Name"
        onChange={e => setData({ ...data, name: e.target.value })}
      />

      <input
        placeholder="Email"
        onChange={e => setData({ ...data, email: e.target.value })}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={e => setData({ ...data, password: e.target.value })}
      />

      {/* ✅ ROLE DROPDOWN */}
    <select
  onChange={e => setData({...data, role: e.target.value})}
>
  <option value="">Select Role</option>
  <option value="FARMER">Farmer</option>
  <option value="BUYER">Buyer</option>
</select>

      <button onClick={register}>Register</button>
    </div>
  );
}
import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="navbar">
      <div><b>🌾 Farmer Marketplace</b></div>

      <div>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/add-crop">Add Crop</Link>
        <Link to="/crops">Crops</Link>
        <Link to="/orders">Orders</Link>
        <Link to="/">Logout</Link>
      </div>
    </div>
  );
}
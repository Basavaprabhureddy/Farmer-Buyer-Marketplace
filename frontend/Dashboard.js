import React from "react";

export default function Dashboard() {
  return (
    <div className="container">
      <h2>Dashboard</h2>

      <div className="card">
        <h3>Welcome 👋</h3>
        <p>This is your Farmer Marketplace system.</p>

        <ul>
          <li>📦 Add Crops</li>
          <li>🛒 Buyers place orders</li>
          <li>💰 Negotiate price</li>
          <li>✅ Accept or Reject orders</li>
        </ul>
      </div>
    </div>
  );
}
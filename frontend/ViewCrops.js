import React, { useEffect, useState } from "react";
import API from "../api";

export default function ViewCrops() {
  const [crops, setCrops] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    API.get("/crops")
      .then(res => setCrops(res.data))
      .catch(err => console.error(err));
  }, []);

  const order = async (cropId) => {
    if (!user?.id) {
      alert("User not logged in");
      return;
    }

    let price = prompt("Enter your price:");
    if (!price) return;

    price = Number(price);

    if (isNaN(price) || price <= 0) {
      alert("Enter valid price");
      return;
    }

    try {
      await API.post("/orders/request", null, {
        params: {
          buyerId: user.id,
          cropId: cropId,
          price: price
        }
      });

      alert("✅ Order placed!");
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("❌ Failed to place order");
    }
  };

  return (
    <div className="container">
      <h2 className="page-title">🌾 Available Crops</h2>

      <div className="grid">
        {crops.map(c => (
          <div className="card crop-card" key={c.id}>

            <img
              src={`http://localhost:8080/uploads/${c.imageUrl}`}
              alt="crop"
              className="crop-image"
            />

           <h3>🌾 {c.name}</h3>
            <p className="price">₹ {c.price}</p>
            <p className="qty">Qty: {c.quantity}</p>

            {/* ✅ ONLY BUYER */}
            {user?.role?.toUpperCase() === "BUYER" && (
              <button className="primary-btn" onClick={() => order(c.id)}>
                🛒 Order
              </button>
            )}

          </div>
        ))}
      </div>
    </div>
  );
}
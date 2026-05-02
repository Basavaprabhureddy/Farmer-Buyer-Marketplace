import React, { useEffect, useState } from "react";
import API from "../api";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [crops, setCrops] = useState([]); // ✅ store crops
  const [counter, setCounter] = useState({});
  const user = JSON.parse(localStorage.getItem("user"));

  // ✅ Load orders
  const loadOrders = () => {
    if (!user) return;

    if (user.role?.toUpperCase() === "FARMER") {
      API.get(`/orders/farmer/${user.id}`)
        .then(res => setOrders(res.data));
    } else {
      API.get(`/orders/buyer/${user.id}`)
        .then(res => setOrders(res.data));
    }
  };

  // ✅ Load crops
  const loadCrops = () => {
    API.get("/crops")
      .then(res => setCrops(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    loadOrders();
    loadCrops(); // ✅ important
  }, []);

  // ✅ Get crop name using cropId
  const getCropName = (id) => {
    const crop = crops.find(c => c.id === id);
    return crop ? crop.name : "Loading...";
  };

  const accept = async (id) => {
    await API.put(`/orders/accept/${id}`);
    loadOrders();
  };

  const reject = async (id) => {
    await API.put(`/orders/reject/${id}`);
    loadOrders();
  };

  const counterOffer = async (id) => {
    if (!counter[id]) {
      alert("Enter counter price");
      return;
    }

    await API.put(`/orders/counter/${id}?price=${counter[id]}`);
    loadOrders();
  };

  return (
    <div className="container">
      <h2>Orders</h2>

      {orders.map(o => (
        <div className="card order-card" key={o.id}>

          {/* ✅ SHOW CROP NAME */}
          <div className="order-header">
            <span>🌾 {getCropName(o.cropId)}</span>

            <span className={`status ${o.status.toLowerCase()}`}>
              {o.status}
            </span>
          </div>

          <p>💰 Buyer Price: ₹{o.offeredPrice}</p>
          <p>🔁 Counter: ₹{o.counterPrice || "-"}</p>

          {o.status !== "ACCEPTED" && o.status !== "REJECTED" && (
            <div className="order-actions">

              <input
                placeholder="Enter counter price"
                onChange={(e) =>
                  setCounter({ ...counter, [o.id]: e.target.value })
                }
              />

              <button className="negotiate" onClick={() => counterOffer(o.id)}>
                Counter
              </button>

              <button className="accept" onClick={() => accept(o.id)}>
                Accept
              </button>

              <button className="reject" onClick={() => reject(o.id)}>
                Reject
              </button>

            </div>
          )}

        </div>
      ))}
    </div>
  );
}
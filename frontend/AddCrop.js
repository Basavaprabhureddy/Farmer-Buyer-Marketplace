import React, { useState } from "react";
import API from "../api";

export default function AddCrop() {
  const [data, setData] = useState({
    name: "",
    price: "",
    quantity: ""
  });

  const [image, setImage] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));

  const addCrop = async (e) => {
    e.preventDefault();

    try {
      if (!data.name || !data.price || !data.quantity || !image) {
        alert("All fields are required");
        return;
      }

      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("price", data.price);
      formData.append("quantity", data.quantity);

      // ✅ FIXED
      formData.append("userId", user.id);

      formData.append("image", image);

      await API.post("/crops", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      alert("✅ Crop added successfully");

      setData({ name: "", price: "", quantity: "" });
      setImage(null);

    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("❌ Failed to add crop");
    }
  };

  return (
    <div className="container">
      <div className="form-container">

        <h2>Add Crop</h2>

        <form onSubmit={addCrop}>

          <input
            placeholder="Name"
            value={data.name}
            onChange={e => setData({ ...data, name: e.target.value })}
          />

          <input
            type="number"
            placeholder="Price"
            value={data.price}
            onChange={e => setData({ ...data, price: e.target.value })}
          />

          <input
            type="number"
            placeholder="Quantity"
            value={data.quantity}
            onChange={e => setData({ ...data, quantity: e.target.value })}
          />

          <input
            type="file"
            onChange={e => setImage(e.target.files[0])}
          />

          <button type="submit" className="primary-btn">
            Add Crop
          </button>

        </form>

      </div>
    </div>
  );
}
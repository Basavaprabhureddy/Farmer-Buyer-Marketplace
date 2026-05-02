import React, { useState } from "react";
import API from "../api";
import { useParams } from "react-router-dom";

export default function PlaceOrder() {
  const { cropId } = useParams();
  const [price, setPrice] = useState("");

  const submit = async () => {
    await API.post(
      `/orders/request?buyerId=${localStorage.getItem("userId")}&cropId=${cropId}&price=${price}`
    );

    alert("Order placed");
  };

  return (
    <div className="container">
      <h2>Place Order</h2>

      <input placeholder="Offer Price"
        onChange={e => setPrice(e.target.value)} />

      <button onClick={submit}>Submit</button>
    </div>
  );
}
import React, { useEffect, useState } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar";


function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    API.get("/api/products") // ✅ uses token automatically
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <Navbar />

      <div className="products-container">
        <h2>Products</h2>

        <div className="grid">
          {products.map((p) => (
            <div className="card" key={p.id}>
              <h3>{p.name}</h3>
              <p>₹{p.price}</p>
              <p>Qty: {p.quantity}</p>
              <p>Farmer: {p.farmer?.name}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Products;
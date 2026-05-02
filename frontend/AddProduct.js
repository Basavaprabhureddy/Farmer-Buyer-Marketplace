import React, { useState } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar";


function AddProduct() {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    quantity: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/api/products", product);
      alert("Product added");
    } catch (err) {
      console.error(err);
      alert("Error adding product");
    }
  };

  return (
    <div>

      <>
      <Navbar/>
      <h2>Add Product</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          onChange={(e) =>
            setProduct({ ...product, name: e.target.value })
          }
        />

        <input
          placeholder="Price"
          onChange={(e) =>
            setProduct({ ...product, price: e.target.value })
          }
        />

        <input
          placeholder="Quantity"
          onChange={(e) =>
            setProduct({ ...product, quantity: e.target.value })
          }
        />

        <button>Add</button>
      </form>
   
   </>
   </div>
  );
}

export default AddProduct;
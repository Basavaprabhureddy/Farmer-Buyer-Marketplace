import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddCrop from "./pages/AddCrop";
import ViewCrops from "./pages/ViewCrops";
import Orders from "./pages/Orders";
import PlaceOrder from "./pages/PlaceOrder";

import Navbar from "./components/Navbar";

import "./styles/main.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-crop" element={<AddCrop />} />
        <Route path="/crops" element={<ViewCrops />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/place-order/:cropId" element={<PlaceOrder />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
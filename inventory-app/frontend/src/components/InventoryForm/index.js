import React, { useState } from "react";
import axios from "axios";
import "./index.css";

export default function InventoryForm({ fetchData, API_BASE }) {
  const [invForm, setInvForm] = useState({
    supplier_id: "",
    product_name: "",
    quantity: "",
    price: "",
  });

  const handleAddInventory = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE}/inventory`, invForm);
      setInvForm({ supplier_id: "", product_name: "", quantity: "", price: "" });
      fetchData();
      alert("Inventory item added successfully!");
    } catch (err) {
      alert(err.response?.data?.message || "Check Supplier ID or quantities.");
    }
  };

  return (
    <section className="card inventory-card">
      <h2>Add Inventory Item</h2>
      <form onSubmit={handleAddInventory}>
        <input
          type="number"
          placeholder="Supplier ID"
          value={invForm.supplier_id}
          onChange={(e) => setInvForm({ ...invForm, supplier_id: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Product Name"
          value={invForm.product_name}
          onChange={(e) => setInvForm({ ...invForm, product_name: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Quantity"
          value={invForm.quantity}
          onChange={(e) => setInvForm({ ...invForm, quantity: e.target.value })}
          required
        />
        <input
          type="number"
          step="0.01"
          placeholder="Unit Price"
          value={invForm.price}
          onChange={(e) => setInvForm({ ...invForm, price: e.target.value })}
          required
        />
        <button type="submit">Add Inventory</button>
      </form>
    </section>
  );
}
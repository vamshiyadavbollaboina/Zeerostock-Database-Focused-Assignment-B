import React, { useState } from "react";
import axios from "axios";
import "./index.css";

export default function SupplierForm({ fetchData, API_BASE }) {
  const [supForm, setSupForm] = useState({ name: "", city: "" });

  const handleAddSupplier = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_BASE}/supplier`, supForm);
      alert(`Supplier Created! ID: ${res.data.id}`);
      setSupForm({ name: "", city: "" });
      fetchData();
    } catch (err) {
      alert(err.response?.data?.message || "Error adding supplier");
    }
  };

  return (
    <section className="card supplier-card">
      <h2>Register New Supplier</h2>
      <form onSubmit={handleAddSupplier}>
        <input
          type="text"
          placeholder="Business Name"
          value={supForm.name}
          onChange={(e) => setSupForm({ ...supForm, name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="City"
          value={supForm.city}
          onChange={(e) => setSupForm({ ...supForm, city: e.target.value })}
          required
        />
        <button type="submit">Add Supplier</button>
      </form>
    </section>
  );
}
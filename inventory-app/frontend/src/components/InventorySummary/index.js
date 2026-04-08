import React from "react";
import "./index.css";

export default function InventorySummary({ summary, loading }) {
  return (
    <section className="card full-width summary-card">
      <h2>Inventory Summary by Supplier</h2>
      {loading ? (
        <div className="loader">Loading summary...</div>
      ) : (
        <table className="inventory-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Supplier</th>
              <th>Products</th>
              <th>Total Inventory Value</th>
            </tr>
          </thead>
          <tbody>
            {summary.length > 0 ? (
              summary.map((item) => (
                <tr key={item.supplier_id}>
                  <td>{item.supplier_id}</td>
                  <td>{item.supplier_name}</td>
                  <td>{item.products || "No products"}</td>
                  <td>${item.total_value || 0}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No summary available</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </section>
  );
}
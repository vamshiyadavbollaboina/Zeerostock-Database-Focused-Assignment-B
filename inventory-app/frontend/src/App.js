import React, { useState, useEffect } from "react";
import axios from "axios";

import SupplierForm from "./components/SupplierForm";
import InventoryForm from "./components/InventoryForm";
import InventorySummary from "./components/InventorySummary";
import "./App.css";

const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5000";

function App() {
  const [summary, setSummary] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/inventory`);
      setSummary(res.data);
      setError(null);
    } catch (err) {
      setError("Could not fetch inventory data. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container">
      <header className="main-header">
        <h1>Inventory Control Dashboard</h1>
        <p>Manage suppliers and track total inventory valuation.</p>
      </header>

      {error && <div className="error-banner">{error}</div>}

      <div className="form-grid">
        <SupplierForm fetchData={fetchData} API_BASE={API_BASE} />
        <InventoryForm fetchData={fetchData} API_BASE={API_BASE} />
      </div>

      <InventorySummary summary={summary} loading={loading} />
    </div>
  );
}

export default App;
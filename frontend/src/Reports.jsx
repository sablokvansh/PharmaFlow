import React, { useEffect, useState } from "react";
import "./Reports.css";
import CountUp from "./CountUp";
import GhostCursor from "./components/GhostCursor";
import axios from "axios";

export default function Reports() {
  const [reportData, setReportData] = useState({
    totalItems: 0,
    damagedItems: 0,
    inUseItems: 0,
    suppliers: 0,
    lowStockItems: 0,
  });

  const [recentStock, setRecentStock] = useState([]);

  // ✅ Fetch reports data
  const fetchReportData = async () => {
    try {
      const res = await axios.get("https://pharma-flow-nine.vercel.app/reports");
      setReportData(res.data);
    } catch (err) {
      console.error("Error fetching report data:", err);
    }
  };

  // ✅ Fetch recent stock
  const fetchRecentStock = async () => {
    try {
      const res = await axios.get("https://pharma-flow-nine.vercel.app/inventory"); // existing route
      // Sort by last updated date (if available)
      const sorted = res.data.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
      setRecentStock(sorted.slice(0, 5)); // show latest 5 items
    } catch (err) {
      console.error("Error fetching inventory data:", err);
    }
  };

  useEffect(() => {
    fetchReportData();
    fetchRecentStock();
  }, []);

  return (
    <div className="reports-page-wrapper">
      {/* ✨ Background effect */}
      <GhostCursor
        color="#5ed7d6"
        brightness={1.2}
        edgeIntensity={0.2}
        trailLength={50}
        inertia={0.5}
        grainIntensity={0.03}
        bloomStrength={0.2}
        bloomRadius={1.0}
        bloomThreshold={0.02}
        fadeDelayMs={1000}
        fadeDurationMs={1500}
      />

      {/* 🔹 Foreground content */}
      <div className="reports-container">
        <h2 className="reports-title">📊 Inventory Reports Dashboard</h2>

        {/* Summary Cards Section */}
        <div className="reports-summary">
          <div className="report-card">
            <h4>Total Items</h4>
            <p className="report-value">
              <CountUp from={0} to={reportData.totalItems} duration={2} />
            </p>
            <span className="report-sub">All items recorded</span>
          </div>

                   

          <div className="report-card">
            <h4>Suppliers</h4>
            <p className="report-value">
              <CountUp from={0} to={reportData.suppliers} duration={2} />
            </p>
            <span className="report-sub">Trusted sources</span>
          </div>

          <div className="report-card">
            <h4>Low Stock Items</h4>
            <p className="report-value">
              <CountUp from={0} to={reportData.lowStockItems} duration={2} />
            </p>
            <span className="report-sub">Below threshold level</span>
          </div>
        </div>

        {/* Table Section */}
        <div className="report-table-section">
          <h3>📦 Recent Stock Summary</h3>
          <table className="report-table">
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Category</th>
                <th>Status</th>
                <th>Quantity</th>

              </tr>
            </thead>
            <tbody>
              {recentStock.length > 0 ? (
                recentStock.map((item) => (
                  <tr key={item._id}>
                    <td>{item.name}</td>
                    <td>{item.capacity || "—"}</td>
                    <td
                      className={`status ${
                        item.status === ""
                          ? "low"
                          : item.status === "In Use"
                          ? "medium"
                          : "good"
                      }`}
                    >
                      {item.status}
                    </td>
                    <td>{item.total_quantity}</td>
    
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center", color: "#ccc" }}>
                    No stock data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

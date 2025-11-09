import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import "./Inventory.css";

const LOCATIONS = ["Total Stock", "101/102", "201", "204", "205", "302", "304"];

const Inventory = () => {
  const [inventoryData, setInventoryData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterLocation, setFilterLocation] = useState("Total Stock");
  const [showModal, setShowModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [newItem, setNewItem] = useState({ name: "", capacity: "", material: "", total_quantity: "", status: "" });
  const [updateItem, setUpdateItem] = useState(null);

  // Assume user email stored in localStorage after login
  const currentUser = localStorage.getItem("userEmail");
  const isAdmin = currentUser === "admin@gmail.com";

  // --- Fetch inventory from backend ---
  const fetchInventory = async () => {
    try {
      const res = await axios.get("http://localhost:5000/inventory");
      setInventoryData(res.data);
    } catch (err) {
      console.error("Error fetching inventory:", err);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const filteredInventory = useMemo(() => {
    return inventoryData.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.capacity.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, inventoryData]);

// --- Add Item ---
const handleAddItem = async (e) => {
  e.preventDefault();
  try {
    const itemToAdd = {
      ...newItem,
      status: newItem.total_quantity === "0" || newItem.total_quantity === 0 ? "Out of Stock" : newItem.status || "In Stock",
    };

    await axios.post("http://localhost:5000/inventory", itemToAdd);
    fetchInventory();
    setNewItem({ name: "", capacity: "", material: "", total_quantity: "", status: "" });
    setShowModal(false);
  } catch (err) {
    console.error("Error adding item:", err);
  }
};

// --- Update Item ---
const handleUpdateSubmit = async (e) => {
  e.preventDefault();
  try {
    const updated = {
      ...updateItem,
      status: updateItem.total_quantity === "0" || updateItem.total_quantity === 0 ? "Out of Stock" : updateItem.status,
    };

    await axios.put(`http://localhost:5000/inventory/${updateItem._id}`, updated);
    fetchInventory();
    setShowUpdateModal(false);
  } catch (err) {
    console.error("Error updating item:", err);
  }
};


  // --- Delete Item ---
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await axios.delete(`http://localhost:5000/inventory/${id}`);
        fetchInventory();
      } catch (err) {
        console.error("Error deleting item:", err);
      }
    }
  };

  const COL_SPAN_COUNT = 7;

  return (
    <div className="inventory-page-container">
      <div className="container py-5">
        <h2 className="inventory-title mb-2">Glassware Inventory Hub</h2>
       

        {/* Control Panel */}
        <div className="control-panel mb-4 d-flex justify-content-between align-items-center flex-wrap">
          <input
            type="text"
            className="form-control dark-input1 w-50"
            placeholder="Search by Name or Capacity..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              border: "1px solid black",
              marginRight: "1rem",
            }}
          />

          {isAdmin && (
            <button
              type="button"
              onClick={() => setShowModal(true)}
              style={{
                background: "linear-gradient(90deg, #a0f1ef, #7ee7e5)",
                color: "#0e1b27",
                fontWeight: "700",
                border: "none",
                borderRadius: "8px",
                padding: "0.7rem 1.3rem",
                boxShadow: "0 0 12px rgba(126, 231, 229, 0.4)",
                transition: "all 0.3s ease",
                cursor: "pointer",
              }}
            >
              + Add New Item
            </button>
          )}
        </div>

        {/* Inventory Table */}
        <div className="table-responsive">
          <table className="table inventory-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Glassware Name</th>
                <th>Capacity/Type</th>
                <th>Material</th>
                <th>Quantity</th>
                <th>Status</th>
                {isAdmin && <th>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {filteredInventory.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.capacity}</td>
                  <td>{item.material}</td>
                  <td>{item.total_quantity}</td>
                  <td>
                    <span className={`badge rounded-pill ${item.status === "In Stock" ? "status-available" : "status-maintenance"}`}>
                      {item.status}
                    </span>
                  </td>
                  {isAdmin && (
                    <td>
                      <button onClick={() => { setUpdateItem(item); setShowUpdateModal(true); }}
                        style={{backgroundColor: "orange",}}>Update</button>
                      <button onClick={() => handleDelete(item._id)} style={{ marginLeft: "0.5rem", backgroundColor: "red", color: "white" }}>
                        Delete
                      </button>
                    </td>
                  )}
                </tr>
              ))}
              {filteredInventory.length === 0 && (
                <tr>
                  <td colSpan={COL_SPAN_COUNT} className="text-center text-muted py-4">
                    No items found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Modal */}
      {showModal && isAdmin && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h4>Add New Item</h4>
            <form onSubmit={handleAddItem}>
              <input type="text" placeholder="Glassware Name" className="form-control mb-2"
                value={newItem.name} onChange={(e) => setNewItem({ ...newItem, name: e.target.value })} required />
              <input type="text" placeholder="Capacity/Type" className="form-control mb-2"
                value={newItem.capacity} onChange={(e) => setNewItem({ ...newItem, capacity: e.target.value })} />
              <input type="text" placeholder="Material" className="form-control mb-2"
                value={newItem.material} onChange={(e) => setNewItem({ ...newItem, material: e.target.value })} />
              <input
  type="number"
  placeholder="Quantity"
  className="form-control mb-2"
  value={newItem.total_quantity}
  onChange={(e) => {
    const qty = e.target.value;
    setNewItem({
      ...newItem,
      total_quantity: qty,
      status: qty === "0" ? "Out of Stock" : newItem.status,
    });
  }}
/>
              <select className="form-control mb-3"
                value={newItem.status} onChange={(e) => setNewItem({ ...newItem, status: e.target.value })}>
                <option value="">Select Status</option>
                <option value="In Stock">In Stock</option>
                <option value="Out of Stock">Out of Stock</option>
              </select>

              <div className="d-flex justify-content-end">
                <button type="submit" className="btn btn-success me-2">Add Item</button>
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Update Modal */}
      {showUpdateModal && isAdmin && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h4>Update Item</h4>
            <form onSubmit={handleUpdateSubmit}>
              <input type="text" className="form-control mb-2"
                value={updateItem.name} onChange={(e) => setUpdateItem({ ...updateItem, name: e.target.value })} />
              <input type="text" className="form-control mb-2"
                value={updateItem.capacity} onChange={(e) => setUpdateItem({ ...updateItem, capacity: e.target.value })} />
              <input type="text" className="form-control mb-2"
                value={updateItem.material} onChange={(e) => setUpdateItem({ ...updateItem, material: e.target.value })} />
              <input
  type="number"
  className="form-control mb-2"
  value={updateItem.total_quantity}
  onChange={(e) => {
    const qty = e.target.value;
    setUpdateItem({
      ...updateItem,
      total_quantity: qty,
      status: qty === "0" ? "Out of Stock" : updateItem.status,
    });
  }}
/>
              <select className="form-control mb-3"
                value={updateItem.status} onChange={(e) => setUpdateItem({ ...updateItem, status: e.target.value })}>
                <option value="In Stock">In Stock</option>
                <option value="Out of Stock">Out of Stock</option>
              </select>
              <div className="d-flex justify-content-end">
                <button type="submit" className="btn btn-primary me-2">Update</button>
                <button className="btn btn-secondary" onClick={() => setShowUpdateModal(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inventory;

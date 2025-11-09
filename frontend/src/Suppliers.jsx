import React, { useState, useEffect } from "react";
import Galaxy from "./Galaxy";
import axios from "axios";
import "./Suppliers.css";

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newSupplier, setNewSupplier] = useState({
    name: "",
    contact: "",
    phone: "",
    products: "",
  });

  // ✅ Get current user info from localStorage
  const currentUser = localStorage.getItem("userEmail");
  const isAdmin = currentUser === "admin@gmail.com";

  // ✅ Fetch suppliers from backend
  const fetchSuppliers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/suppliers");
      setSuppliers(res.data);
    } catch (err) {
      console.error("Error fetching suppliers:", err);
    }
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

// ✅ Handle Delete
const handleDeleteSupplier = async (id) => {
  if (window.confirm("Are you sure you want to delete this supplier?")) {
    try {
      await axios.delete(`http://localhost:5000/suppliers/${id}`);
      fetchSuppliers();
      alert("Supplier deleted successfully!");
    } catch (err) {
      console.error("Error deleting supplier:", err);
      alert("Failed to delete supplier.");
    }
  }
};

// ✅ Handle Edit (Open modal prefilled)
const handleEditSupplier = (supplier) => {
  setNewSupplier(supplier);
  setShowModal(true);
};

// ✅ Modify handleAddSupplier to handle update too
const handleAddSupplier = async (e) => {
  e.preventDefault();
  try {
    if (newSupplier._id) {
      // Update existing supplier
      await axios.put(`http://localhost:5000/suppliers/${newSupplier._id}`, newSupplier);
      alert("Supplier updated successfully!");
    } else {
      // Add new supplier
      await axios.post("http://localhost:5000/suppliers", newSupplier);
      alert("Supplier added successfully!");
    }
    setShowModal(false);
    setNewSupplier({ name: "", contact: "", phone: "", products: "" });
    fetchSuppliers();
  } catch (err) {
    console.error("Error saving supplier:", err);
    alert("Failed to save supplier. Please try again.");
  }
};


  return (
    <div className="suppliers-page">
      {/* Galaxy Background */}
      <div className="galaxy-bg">
        <Galaxy
          mouseRepulsion={true}
          mouseInteraction={true}
          density={1.4}
          glowIntensity={0.5}
          saturation={0.8}
          hueShift={180}
        />
      </div>

      {/* Content */}
      <div className="suppliers-container">
        <h2 className="suppliers-title">Our Trusted Suppliers</h2>
        <p className="suppliers-subtitle">
          Quality materials delivered with precision and reliability.
        </p>

        {/* ✅ Add New Supplier Button (Admin only) */}
        {isAdmin && (
          <button
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
              marginBottom: "20px",
            }}
          >
            ➕ Add New Supplier
          </button>
        )}

        {/* Suppliers List */}
<div className="suppliers-grid">
  {suppliers.map((supplier) => (
    <div key={supplier._id || supplier.id} className="supplier-card">
      <h3>{supplier.name}</h3>
      <p><strong>Contact:</strong> {supplier.contact}</p>
      <p><strong>Phone:</strong> {supplier.phone}</p>
      <p><strong>Products:</strong> {supplier.products}</p>

      {/* ✅ Admin controls */}
      {isAdmin && (
        <div style={{ marginTop: "10px" }}>
          <button
            onClick={() => handleEditSupplier(supplier)}
            style={{
              marginRight: "10px",
              backgroundColor: "#ffc107",
              color: "#000",
              border: "none",
              padding: "5px 10px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            ✏️ Edit
          </button>
          <button
            onClick={() => handleDeleteSupplier(supplier._id)}
            style={{
              backgroundColor: "#dc3545",
              color: "white",
              border: "none",
              padding: "5px 10px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  ))}

  {suppliers.length === 0 && (
    <p style={{ color: "#aaa", textAlign: "center", marginTop: "2rem" }}>
      No suppliers found.
    </p>
  )}
</div>
      </div>

      {/* ✅ Add Supplier Modal */}
      {showModal && isAdmin && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h4>{newSupplier._id ? "Edit Supplier" : "Add New Supplier"}</h4>
            <form onSubmit={handleAddSupplier}>
              <input
                type="text"
                placeholder="Supplier Name"
                className="form-control mb-2"
                value={newSupplier.name}
                onChange={(e) =>
                  setNewSupplier({ ...newSupplier, name: e.target.value })
                }
                required
              />
              <input
                type="email"
                placeholder="Contact Email"
                className="form-control mb-2"
                value={newSupplier.contact}
                onChange={(e) =>
                  setNewSupplier({ ...newSupplier, contact: e.target.value })
                }
                required
              />
              <input
                type="text"
                placeholder="Phone Number"
                className="form-control mb-2"
                value={newSupplier.phone}
                onChange={(e) =>
                  setNewSupplier({ ...newSupplier, phone: e.target.value })
                }
                required
              />
              <textarea
                placeholder="Products Supplied"
                className="form-control mb-3"
                value={newSupplier.products}
                onChange={(e) =>
                  setNewSupplier({ ...newSupplier, products: e.target.value })
                }
                required
              />

              <div className="d-flex justify-content-end">
                <button type="submit" className="btn btn-success me-2">
                  Add Supplier
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Suppliers;

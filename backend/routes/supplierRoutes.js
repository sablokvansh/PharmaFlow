import express from "express";
import Supplier from "../models/supplierModel.js";
const router = express.Router();

// Get all suppliers
router.get("/", async (req, res) => {
  try {
    const suppliers = await Supplier.find();
    res.json(suppliers);
  } catch (err) {
    res.status(500).json({ message: "Error fetching suppliers" });
  }
});

// Add new supplier
router.post("/", async (req, res) => {
  try {
    const { name, contact, phone, products } = req.body;
    const newSupplier = new Supplier({ name, contact, phone, products });
    await newSupplier.save();
    res.status(201).json({ message: "Supplier added", supplier: newSupplier });
  } catch (err) {
    res.status(500).json({ message: "Error adding supplier" });
  }
});

// ✅ PUT (update supplier)
router.put("/:id", async (req, res) => {
  try {
    const updated = await Supplier.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ message: "Supplier not found" });
    res.status(200).json({ message: "Supplier updated", supplier: updated });
  } catch (err) {
    res.status(500).json({ message: "Error updating supplier" });
  }
});

// ✅ DELETE supplier
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Supplier.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Supplier not found" });
    res.status(200).json({ message: "Supplier deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting supplier" });
  }
});

export default router;

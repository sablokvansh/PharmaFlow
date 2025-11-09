import express from "express";
import Inventory from "../models/Inventory.js";
import Supplier from "../models/supplierModel.js";
const router = express.Router();

// ✅ Endpoint: Get Report Summary
router.get("/", async (req, res) => {
  try {
    const totalItems = await Inventory.countDocuments();
    const damagedItems = await Inventory.countDocuments({ status: "Damaged" });
    const inUseItems = await Inventory.countDocuments({ status: "In Use" });
    const suppliers = await Supplier.countDocuments();

    // You can add more stats if needed (e.g., low stock items)
    const lowStockItems = await Inventory.countDocuments({ total_quantity: { $lt: 10 } });

    res.status(200).json({
      totalItems,
      damagedItems,
      inUseItems,
      suppliers,
      lowStockItems,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching report data" });
  }
});

export default router;

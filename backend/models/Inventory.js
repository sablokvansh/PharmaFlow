import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  capacity: String,
  material: String,
  total_quantity: Number,
  status: { type: String, default: "In Stock" }
});

export default mongoose.model("Inventory", inventorySchema);

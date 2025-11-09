import mongoose from "mongoose";

const supplierSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contact: { type: String, required: true },
  phone: { type: String, required: true },
  products: { type: String, required: true },
});

export default mongoose.model("Supplier", supplierSchema);

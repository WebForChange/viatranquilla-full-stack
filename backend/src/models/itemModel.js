import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
    name: { type: String, required: true, default: "New Item" },
    description: { type: String, required: true, default: "New Description" },
    image: { type: String, default: "" },
    quantity: { type: Number, required: true, default: 1 },
    category: { type: String, required: true, default: "Other" },
    visibility: { type: Boolean, required: true, default: true },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    });

export default mongoose.model("Item", itemSchema);
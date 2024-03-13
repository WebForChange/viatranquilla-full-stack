import mongoose from "mongoose";

const carSchema = new mongoose.Schema({
    make: { type: String, required: true, default: "New Car" },
    model: { type: String, required: true, default: "New Model" },
    year: { type: Number, required: true, default: 2020 },
    color: { type: String, required: true, default: "black" },
    seats: { type: Number, required: true, default: 4 },
    image: { type: String, default: "" },
    creator: { type: String, required: true },
    });

export default mongoose.model("Car", carSchema);
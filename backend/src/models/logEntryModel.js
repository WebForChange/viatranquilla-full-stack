import mongoose from "mongoose";
const Schema = mongoose.Schema;

const logEntrySchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    image: { type: String },
    destination: { type: Geolocation },
  },
  { timestamps: true }
);

export default mongoose.model("LogEntry", logEntrySchema);

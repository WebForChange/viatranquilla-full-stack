import mongoose from "mongoose";
const Schema = mongoose.Schema;

const logEntrySchema = new Schema({
  title: { type: String, required: true },
  start: { type: Date, required: true },
  end: { type: Date, required: true },
  description: { type: String },
  image: { type: String },
  destination: { type: Geolocation },
});

export default mongoose.model("LogEntry", logEntrySchema);

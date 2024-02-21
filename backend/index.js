import express from "express";
import mongoose from "mongoose";
import authRoutes from "./src/routes/authRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

//mongoose.connect('MongoDBConnectionString');

app.use("/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

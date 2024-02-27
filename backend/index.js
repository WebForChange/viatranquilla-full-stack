import express from "express";
import authRoutes from "./src/routes/authRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
import tripRoutes from "./src/routes/tripRoutes.js";
import { errorHandler } from "./src/middlewares/ErrorHandler.js";
import './src/db/server.js'
import "dotenv/config";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use("/auth", authRoutes);
app.use('/users', userRoutes);
app.use('/user', userRoutes);
app.use('/profile', userRoutes);
app.use('/trips', tripRoutes);
app.use('/trip', tripRoutes);


app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

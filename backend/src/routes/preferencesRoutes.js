import express from "express";
import * as prefController from "../controllers/prefController.js";
import verifyToken from "../middlewares/verifyToken.js";

const router = express.Router();

router
  .route("/")
  .get(verifyToken, prefController.getPreferences)
  .post(verifyToken, prefController.setPreferences);

export default router;

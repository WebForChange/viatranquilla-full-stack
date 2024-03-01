import express from "express";
import * as prefController from "../controllers/preferencesController.js";
import verifyToken from "../middlewares/verifyToken.js";

const router = express.Router();

router.route("/").get(verifyToken, prefController.getPreferences);

export default router;

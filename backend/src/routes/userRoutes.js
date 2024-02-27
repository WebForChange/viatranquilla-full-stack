import express from "express";
import * as userController from "../controllers/userController.js";
import * as tripController from "../controllers/tripController.js";

const router = express.Router();

router.route("/").get(userController.getAllUsers);

router.route("/:username").get(userController.getProfileDataByID);

router.route("/:id/trips").get(tripController.getTripDataByUser);

export default router;

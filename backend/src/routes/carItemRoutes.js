import express from "express";
import verifyToken from "../middlewares/verifyToken.js";
import * as carItemController from "../controllers/carItemController.js";

const router = express.Router();

router
    .route("/:username")
    .get(verifyToken, carItemController.getVehicleByUsername)

router
    .route("/:id")
    .delete(verifyToken, carItemController.deleteVehicle)

router
    .route("/vehicles/:id")
    .put(verifyToken, carItemController.updateCar)

router
    .route("/item/:username")
    .get(verifyToken, carItemController.getItemsByUsername)

router
    .route("/item")
    .post(verifyToken, carItemController.createItem)

router
    .route("/vehicles")
    .post(verifyToken, carItemController.createCar)

export default router;
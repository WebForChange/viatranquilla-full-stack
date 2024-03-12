import express from "express";
import verifyToken from "../middlewares/verifyToken.js";
import * as carItemController from "../controllers/carItemController.js";

const router = express.Router();

router
    .route("/vehicles/:username")
    .get(verifyToken, carItemController.getVehicleByUsername)

router
    .route("/vehicles/:id")
    .delete(verifyToken, carItemController.deleteVehicle)
    .put(verifyToken, carItemController.updateCar)

router
    .route("/items/:username")
    .get(verifyToken, carItemController.getItemsByUsername)

router
    .route("/items/item")
    .post(verifyToken, carItemController.createItem)

router
    .route("/vehicles")
    .post(verifyToken, carItemController.createCar)

export default router;
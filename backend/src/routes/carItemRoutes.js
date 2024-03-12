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
    .delete(verifyToken, carItemController.deleteItem)

router
    .route("/edit/:item")
    .put(verifyToken, carItemController.updateItem)

router
    .route("/vehicles/:id")
    .put(verifyToken, carItemController.updateCar)

router
    .route("/:username")
    .get(verifyToken, carItemController.getItemsByUsername)

router
    .route("/item")
    .post(verifyToken, carItemController.createItem)

router
    .route("/vehicles")
    .post(verifyToken, carItemController.createCar)

export default router;
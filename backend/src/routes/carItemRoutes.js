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
    

router
    .route("/items/:id")
    .delete(verifyToken, carItemController.deleteItem)

router
    .route("/items/id/:id")
    .get(verifyToken, carItemController.getItemById)

router
    .route("/items/edit/:item")
    .put(verifyToken, carItemController.updateItem)

router
    .route("/items/vehicles/:id")
    .put(verifyToken, carItemController.updateCar)

router
    .route("/items/:username")
    .get(verifyToken, carItemController.getItemsByUsername)

router
    .route("/item")
    .post(verifyToken, carItemController.createItem)

router
    .route("/items/vehicles")
    .post(verifyToken, carItemController.createCar)

export default router;
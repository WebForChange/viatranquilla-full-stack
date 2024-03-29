import express from "express";
import * as tripController from "../controllers/tripController.js";
import verifyToken from "../middlewares/verifyToken.js";

const router = express.Router();

router
  .route("/")
  .get(verifyToken, tripController.getUserTrips)
  .post(verifyToken, tripController.createTrip);
router.route("/").get(verifyToken, tripController.getInvitedTrips);
router.route("/search").get(tripController.getTripDataByQuery);
router
  .route("/:id")
  .get(tripController.getTripDataByID)
  .put(verifyToken, tripController.updateTrip)
  .delete(verifyToken, tripController.deleteTrip);

export default router;

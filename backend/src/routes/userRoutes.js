import express from "express";
import * as userController from "../controllers/userController.js";
import * as tripController from "../controllers/tripController.js";
import verifyToken from "../middlewares/verifyToken.js";
import { upload, fileUpload } from "../middlewares/FileUpload.js";

const router = express.Router();

router.route("/").get(userController.getAllUsers);
router
  .route("/edit/:username")
  .get(userController.getProfileDataByUsername)
  .put(
    upload.single("profilePicture"),
    fileUpload,
    userController.updateProfile
  );

router.route("/:username").get(userController.getProfileDataByUsername);
router
  .route("/:username/trips")
  .get(tripController.getTripDataByUser)
  .delete(tripController.deleteTrips);

router.route("/:username/friends").get(userController.getFriends);

router
  .route("/:username/add-friend")
  .post(verifyToken, userController.addFriend);

export default router;

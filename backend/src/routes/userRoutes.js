import express from "express";
import { Router } from "express";
import * as userController from '../controllers/userController.js'
import * as tripController from "../controllers/tripController.js";
import verifyToken from '../middlewares/verifyToken.js';

const router = express.Router();

router.route('/')
.get(userController.getAllUser)

router.route('/:id')
.get(userController.getProfileDataByID)

router.route('/:id/trips')
.get(tripController.getTripDataByUser)

export default router;
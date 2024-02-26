import express from "express";
import { Router } from "express";
import * as tripController from '../controllers/tripController.js'

const router = express.Router();

router.route('/')
.get(tripController.getTripDataFull)
// .post(tripController.createTrip)

router.route('/search')
    .get(tripController.getTripDataByQuery);

router.route('/:id')
.get(tripController.getTripDataByID)

export default router;
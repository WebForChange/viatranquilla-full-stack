import express from "express";
import { Router } from "express";
import * as userController from '../controllers/userController.js'

const router = express.Router();

router.route('/')
.get(userController.getAllUser)

router.route('/:id')
.get(userController.getProfileDataByID)

export default router;
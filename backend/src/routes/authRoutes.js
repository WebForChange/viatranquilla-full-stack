import express from "express";
import * as authController from "../controllers/authController.js";
import verifyToken from "../middlewares/verifyToken.js";

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/register-check", authController.registerCheck);
router.get("/check-username/:username", authController.checkUsername);
router.get("/me", verifyToken, authController.authUser);
router.post("/logout", verifyToken, authController.logout);

export default router;

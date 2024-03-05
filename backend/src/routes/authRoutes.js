import express from "express";
import {
  register,
  login,
  logout,
  registerCheck,
  authUser,
} from "../controllers/authController.js";
import verifyToken from "../middlewares/verifyToken.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/register-check", registerCheck);
router.post("/check-username", checkUsername);
router.get("/me", verifyToken, authUser);
router.get("/logout", verifyToken, logout);

export default router;

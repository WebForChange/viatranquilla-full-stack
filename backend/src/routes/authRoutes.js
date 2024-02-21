import express from "express";
import {
  register,
  login,
  logout,
  registerCheck,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/register-check", registerCheck);
router.get("/logout", logout);

export default router;

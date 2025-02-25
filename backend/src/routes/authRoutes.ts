import express from "express";
import { register, login, logout } from "../controllers/authController";
import { authenticateJWT } from "../middlewares/authMiddleware";

const router = express.Router();


router.post("/register", register);
router.post("/login", login);
router.post("/logout", authenticateJWT, logout);

export default router;
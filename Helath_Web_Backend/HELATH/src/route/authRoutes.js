import express from "express";
import { authController } from "../controller/authController.js";

const router = express.Router();

// Get authenticated user data
router.get("/:userId", authController.getAuthData);
router.post("/login", authController.loginUser);

export default router;
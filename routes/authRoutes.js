import { Router } from "express";
import {
  forgotPasswordController,
  loginController,
  registerController,
} from "../controllers/authControllers.js";

const router = Router();

router
  .post("/register", registerController)
  .post("/login", loginController)
  .post("/forgot-password", forgotPasswordController);

export default router;

import express from "express";
import authController from "../controllers/authController.js";
import { registerValidation, loginValidation } from "../middleware/authValidation.js";
import tokenValidation from "../middleware/tokenValidation.js";

const router = express.Router();

router.post("/register", registerValidation, authController.register);

router.post("/login", loginValidation, authController.login);

router.post("/logout", tokenValidation, authController.logout);

router.get("/current", tokenValidation, authController.getCurrent);

router.patch("/subscription", tokenValidation, authController.updateSubscription);

export default router;
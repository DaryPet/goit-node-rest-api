import express from "express";
import authController from "../controllers/authController.js";
import { registerValidation, loginValidation } from "../middleware/authValidation.js";
import tokenValidation from "../middleware/tokenValidation.js";
import multer from "multer";

const router = express.Router();

const storage = multer.diskStorage({
  destination: 'temp/',
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });

router.post("/register", registerValidation, authController.register);

router.post("/login", loginValidation, authController.login);

router.post("/logout", tokenValidation, authController.logout);

router.get("/current", tokenValidation, authController.getCurrent);

router.patch("/subscription", tokenValidation, authController.updateSubscription);

router.patch("/avatars", tokenValidation, upload.single('avatar'), authController.updateAvatar);

export default router;
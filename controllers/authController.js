import jwt from "jsonwebtoken";
import "dotenv/config";
import { User } from "../db/index.js";
import gravatar from "gravatar";
import { nanoid } from 'nanoid';
import { sendVerificationEmail } from '../services/emailService.js';

const JWT_SECRET = process.env.JWT_SECRET;

const authController = {
  async register(req, res) {
    try {
      const { email, password } = req.body;

      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(409).json({ message: "Conflict, email in use" });
      }

      const avatarURL = gravatar.url(email, {
        s: "250",
        r: "pg",
        d: "identicon",
      });

      const verificationToken = nanoid();

      const user = await User.create({
        email,
        password,
        avatarURL,
        verificationToken,
        verify: false,
      });

      await sendVerificationEmail(email, verificationToken);

      res.status(201).json({
        user: {
          email: user.email,
          subscription: user.subscription,
        },
        message: "Registration successful. Please check your email to verify your account."
      });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  },
  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(401).json({ message: "Email or password is wrong" });
      }

      if (!user.verify) {
        return res.status(401).json({ message: "Email is not verified" });
      }

      const isPaswordValid = await user.validatePassword(password);
      if (!isPaswordValid) {
        return res.status(401).json({ message: "Email or password is wrong:" });
      }

      const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
        expiresIn: "24h",
      });

      user.token = token;
      await user.save();

      res.status(200).json({
        token,
        user: {
          email: user.email,
          subscription: user.subscription,
        },
      });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
      console.log("Auth controller loaded");
    }
  },
  async logout(req, res) {
    try {
      const user = await User.findByPk(req.user.userId);
      if (!user) {
        return res.status(401).json({
          message: "Not authorized",
        });
      }

      user.token = null;
      await user.save();

      res.status(204).send();
    } catch (error) {
      res.status(500).json({
        message: "Server error",
        error: error.message,
      });
    }
  },
  async getCurrent(req, res) {
    try {
      const user = await User.findByPk(req.user.userId, {
        attributes: { exclude: ["password", "token"] },
      });

      if (!user) {
        return res.status(401).json({
          message: "Not authorized",
        });
      }

      res.status(200).json({
        email: user.email,
        subscription: user.subscription,
      });
    } catch (error) {
      res.status(500).json({
        message: "Server error",
        error: error.message,
      });
    }
  },
  async updateSubscription(req, res) {
    try {
      const { subscription } = req.body;
      const validSubscriptions = ["starter", "pro", "business"];

      if (!validSubscriptions.includes(subscription)) {
        return res.status(400).json({
          message: "Invalid subscription type",
        });
      }

      const user = await User.findByPk(req.user.userId);
      user.subscription = subscription;
      await user.save();

      res.status(200).json({
        email: user.email,
        subscription: user.subscription,
      });
    } catch (error) {
      res.status(500).json({
        message: "Server error",
        error: error.message,
      });
    }
  },
  async updateAvatar(req, res) {
    try {
      const user = await User.findByPk(req.user.userId);
      if (!user) return res.status(401).json({ message: "Not authorized" });

      const { path: tempPath, originalname } = req.file;
      const avatarName = `${user.id}_${Date.now()}_${originalname}`;
      const avatarPath = `public/avatars/${avatarName}`;

      const fs = await import("fs/promises");
      await fs.rename(tempPath, avatarPath);

      const avatarURL = `/avatars/${avatarName}`;
      user.avatarURL = avatarURL;
      await user.save();

      res.status(200).json({ avatarURL });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  },
  async verifyEmail(req, res) {
    const { verificationToken } = req.params;
    const user = await User.findOne({ where: { verificationToken } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.verify = true;
    user.verificationToken = null;
    await user.save();
    res.status(200).json({ message: "Verification successful" });
  },
  async resendVerifyEmail(req, res) {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.verify) {
      return res.status(400).json({ message: "Verification has already been passed" });
    }
    await sendVerificationEmail(email, user.verificationToken);
    res.status(200).json({ message: "Verification email sent" });
  },
};

export default authController;

import express from "express";
import {
  authUser,
  deleteUserProfile,
  getUserProfile,
  logoutUser,
  registerUser,
  updateUserProfile,
} from "../controllers/user.controllers.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", registerUser);
router.post("/auth", authUser);
router.post("/logout", logoutUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)
  .delete(protect, deleteUserProfile);

export default router;

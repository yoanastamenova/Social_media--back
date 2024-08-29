import express from "express";
import {
  getUser,
  getUserFriends,
  addRemoveFriend,
  updateUser,
  getAllUsers,
  deleteUser,
  searchUsers,
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";
import { isAdmin } from "../middleware/isAdmin.js";

const router = express.Router();

/* READ */
router.get("/all", isAdmin, getAllUsers);
router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);

// Search users
router.get("/search", verifyToken, searchUsers);

/* UPDATE */
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);
router.put("/:id", verifyToken, updateUser);

/* DELETE */
router.delete("/delete/:id", isAdmin, deleteUser);

export default router;

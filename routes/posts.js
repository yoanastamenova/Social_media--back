import express from "express";
import { deletePost, errasePost, getAllPosts, getFeedPosts, getUserPosts, likePost, updatePost } from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";
import { isAdmin } from "../middleware/isAdmin.js";

const router = express.Router();

/* READ */
router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);

/* UPDATE */
router.patch("/:id/like", verifyToken, likePost);
router.patch('/:postId', verifyToken, updatePost);

// DELETE
router.delete('/:postId', verifyToken, deletePost);

//ADMIN CRUD
router.get("/posts", isAdmin, getAllPosts);
router.delete("/:id", isAdmin, errasePost);

export default router;

import { Router } from "express";
import { auth } from "../../middlewares/auth.js";
import { isAdmin } from "../../middlewares/isAdmin.js";
import { createPost } from "./posts.controller.js";

const router = Router();

router.post('/create', auth, createPost)        // creates new post from the authenticated user
// router.delete('/delete/:_id', auth, deletePost)           //deletes a selected post
// router.put('/update', auth, updatePost)                  //updates a selected post
// router.get('/own', auth, getUserPosts)                  //gets all post by the user
// router.get('/all', auth, isAdmin,getAllPosts)                   //gets a post by its ID
// router.get('/:_id', auth, isAdmin, getPostById)                   //gets a post by its ID
// router.get('/user/:_id', auth, isAdmin, getPostByUserId)            //gets a post by its ID

export default router
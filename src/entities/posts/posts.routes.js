import { Router } from "express";
import { auth } from "../../middlewares/auth";

const router = Router();

router.post('/create', auth, createPost)        // creates new post from the authenticated user
router.delete('/delete/:id', auth, deletePost)           //deletes a selected post
router.put('/update', auth, updatePost)                  //updates a selected post
router.get('/own', auth, getUserPosts)                  //gets all post by the user
router.get('/all', auth, getAllPosts)                   //gets a post by its ID
router.get('/:id', auth, getPostById)                   //gets a post by its ID
router.get('/user/:id', auth, getPostByUserId)            //gets a post by its ID

export default router
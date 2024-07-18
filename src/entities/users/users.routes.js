import { Router } from "express";
import { changeUserRole, deleteUser, followUnfollow, getAllUsers, getUserByEmail, getUserProfile, showTimeline, updateProfile } from "./users.controller.js";
import { auth } from "../../middlewares/auth.js";
import { isAdmin } from "../../middlewares/isAdmin.js";

const router = Router()

//GET, POST AND DELETE USER CRUD
router.get('/all', auth, isAdmin, getAllUsers)       //as admin see all users
router.get('/profile', auth, getUserProfile)    //see your profile
router.put('/profile/update', auth, updateProfile)   //modify your profile

// EXTRA CRUD
router.get('/email', auth, isAdmin, getUserByEmail)          //get specific user by his mail
router.delete('/:id', auth, isAdmin, deleteUser)          //delete user by id
router.put('/role',auth, isAdmin, changeUserRole)           //change user role

//FOLLOW/UNFOLLOW
router.post('/followUnf/:id', auth, followUnfollow)          //to follow or unfollow user by its user ID

//TIMELINE 
router.get('/timeline', auth, showTimeline)                  //to see your timeline

export default router
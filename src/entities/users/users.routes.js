import { Router } from "express";
import { getAllUsers, login, register } from "./users.controller.js";
import { auth } from "../../middlewares/auth.js";

const router = Router()

// AUTHENTICATION
router.post('/register', register)      //to register as user in our app
router.post('/login', login)           // user login in the app

//GET, POST AND DELETE USER CRUD
router.get('/all', auth, getAllUsers)       //as admin see all users
router.get('/profile', auth, getUserProfile)    //see your profile
router.put('/profile/update', auth, updateProfile)   //modify your profile


// EXTRA CRUD
router.get('/email', getUserByEmail)          //get specific user by his mail
router.delete('/:id', auth, deleteUser)          //delete user by id
router.put('/role', changeUserRole)           //change user role


export default router
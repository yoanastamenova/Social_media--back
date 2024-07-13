import { Router } from "express";
import { login, register } from "./users.controller.js";

const router = Router()


// AUTHENTICATION
router.post('/register', register)      //to register as user in our app
router.post('/login', login)           // user login in the app

//GET, POST AND DELETE USER CRUD


export default router
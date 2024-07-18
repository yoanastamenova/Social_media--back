import { Router } from "express";
import { login, register } from "./auth.controller.js";

const router = Router();

// AUTHENTICATION
router.post('/register', register)      //to register as user in our app
router.post('/login', login)           // user login in the app

export default router
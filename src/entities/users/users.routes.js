import { Router } from "express";
import { login, register } from "./users.controller.js";

const router = Router()

router.post('/register', register)      //to register as user in our app
router.post('/login', login)           // user login in the app

export default router
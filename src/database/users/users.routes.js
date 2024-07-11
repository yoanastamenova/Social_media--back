import { Router } from "express";

const router = Router()

router.post('/register', register)      //to register as user in our app
router.post('/login', login)           // user login in the app

export { router }
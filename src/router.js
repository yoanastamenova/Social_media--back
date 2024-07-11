import { Router } from "express";
import usersRoutes from "./entities/users/users.routes.js";

const router = Router()

router.use('/users', usersRoutes)

export default router
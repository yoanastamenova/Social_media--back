import { Router } from "express";
import usersRoutes from "./entities/users/users.routes.js";
import postsRoutes from "./entities/posts/posts.routes.js";
import authRoutes from "./entities/auth/auth.routes.js"

const router = Router()

router.use('/users', usersRoutes)
router.use('/posts', postsRoutes)
router.use('/auth', authRoutes)

export default router
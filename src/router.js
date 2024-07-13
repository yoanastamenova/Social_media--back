import { Router } from "express";
import usersRoutes from "./entities/users/users.routes.js";
import postsRoutes from "./entities/posts/posts.routes.js";

const router = Router()

router.use('/users', usersRoutes)
router.use('/posts', postsRoutes)

export default router
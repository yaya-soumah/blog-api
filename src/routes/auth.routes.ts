import { Router } from "express";
import { login, register, refreshAccessToken, logout } from "../controllers/auth.controller.js";
import { validate } from "../middleware/validate.js";
import {createUserSchema} from '../validators/user.schema.js'
const router = Router()

router.post('/login', login)
router.post('/register', validate(createUserSchema), register)
router.post('/refresh', refreshAccessToken)
router.post('/logout', logout)

export default router
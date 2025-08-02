import { Router } from 'express'

import { login, register, refreshAccessToken, logout } from '../controllers/auth.controller'
import { validate } from '../middleware/validate'
import { RegisterSchema, LoginSchema } from '../validators/user.schema'

const router = Router()

router.post('/login', validate(LoginSchema), login)
router.post('/register', validate(RegisterSchema), register)
router.post('/refresh', refreshAccessToken)
router.post('/logout', logout)

export default router

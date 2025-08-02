import { Router } from 'express'

import { getUsers, updateUserRole, getOne } from '../controllers/user.controller'
import { authorizeRole } from '../middleware/requireRole.middleware'
import { RoleSchema } from '../validators/user.schema'
import { validate } from '../middleware/validate'
const router = Router()

router.get('/', authorizeRole('admin'), getUsers)
router.get('/profile', getOne)
router.put('/:id/role', validate(RoleSchema), updateUserRole)

export default router

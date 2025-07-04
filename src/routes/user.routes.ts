import { Router } from 'express'
import { getUsers, updateUserRole } from '../controllers/user.controller.js'
import { adminOnly } from '../middleware/autorizeRole.js'

const router = Router()

router.get('/', adminOnly('admin'), getUsers)
router.put('/:id/role', adminOnly('admin'), updateUserRole)

export default router

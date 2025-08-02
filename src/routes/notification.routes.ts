import { Router } from 'express'

import { getAll, updateAll } from '../controllers/notification.controller'

const router = Router()

router.get('/', getAll)
router.patch('/', updateAll)

export default router

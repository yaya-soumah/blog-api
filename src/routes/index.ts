import { Router } from 'express'

import { authenticateToken } from '../middleware/auth.middleware'

import authRouter from './auth.routes'
import userRouter from './user.routes'
import commentRouter from './comment.routes'
import likeRouter from './like.routes'
import postRouter from './post.routes'
import notificationRouter from './notification.routes'

const router = Router()

router.use('/auth', authRouter)

router.use(authenticateToken)
router.use('/users', userRouter)
router.use('/posts', postRouter)
router.use('/comments', commentRouter)
router.use('/likes', likeRouter)
router.use('/notifications', notificationRouter)

export default router

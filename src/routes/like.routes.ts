import { Router } from 'express'

import {
  likePost,
  getPostLikes,
  likeComment,
  getUsersWhoLikedComment,
  getUsersWhoLikedPost,
} from '../controllers/like.controller'

const router = Router()

router.post('/:postId', likePost)
router.get('/:postId', getPostLikes)
router.get('/post/:postId/users', getUsersWhoLikedPost)
router.post('/comment/:commentId', likeComment)
router.get('/comment/:commentId/users', getUsersWhoLikedComment)

export default router

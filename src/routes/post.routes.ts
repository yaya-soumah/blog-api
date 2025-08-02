import { Router } from 'express'

import {
  getPosts,
  createPost,
  deletePost,
  updatePost,
  getOne,
} from '../controllers/post.controller'
import { validate } from '../middleware/validate'
import { createPostSchema, UpdatePostSchema } from '../validators/post.schema'

const router = Router()

router.get('/', getPosts)
router.get('/:id', getOne)
router.post('/', validate(createPostSchema), createPost)
router.delete('/:id', deletePost)
router.put('/:id', validate(UpdatePostSchema), updatePost)

export default router

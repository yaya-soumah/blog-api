import { Router } from 'express'
import { getPosts, createPost, deletePost, updatePost } from '../controllers/post.controller.js'
import { validate, validateQuery } from '../middleware/validate.js'
import { createPostSchema, getPostsSchema } from '../validators/post.schema.js'
import { authorizePostOwnerOrAdmin } from '../middleware/authorize.js'

const router = Router()

router.get('/', validateQuery(getPostsSchema), getPosts)
router.post('/', validate(createPostSchema), createPost)
router.delete('/:id', authorizePostOwnerOrAdmin, deletePost)
router.put('/:id', authorizePostOwnerOrAdmin, updatePost)

export default router

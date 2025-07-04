// routes/comment.routes.ts
import { Router } from 'express'
import {
  createComment,
  getCommentsByPost,
  updateComment,
  deleteComment,
} from '../controllers/comment.controller.js'
import { validate } from '../middleware/validate.js'
import { createCommentSchema, updateCommentSchema } from '../validators/comment.schema.js'

const router = Router()

router.get('/post/:postId', getCommentsByPost)
router.post('/', validate(createCommentSchema), createComment)
router.put('/:id', validate(updateCommentSchema), updateComment)
router.delete('/:id', deleteComment)

export default router

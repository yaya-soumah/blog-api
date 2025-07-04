import { Request, Response, NextFunction } from 'express'
import { PostRepository } from '../repositories/post.repository.js'
import { AppError } from '../utils/app.error.js'

// only post owner or admin can procedd
export const authorizePostOwnerOrAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = (req as any).user
  const postId = parseInt(req.params.id)

  const post = await PostRepository.findById(postId)

  if (!post) throw new AppError('Post not found', 404)

  if (post.userId !== user.userId && user.role !== 'admin') {
    throw new AppError('Forbidden: Not allowed', 403)
  }

  next()
}

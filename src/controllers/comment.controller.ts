import { Request, Response, NextFunction } from 'express'
import { CommentService } from '../services/comment.service.js'

export const createComment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { content, postId } = req.body
    const userId = (req as any).user.userId

    const comment = await CommentService.addComment(userId, postId, content)
    res.status(201).json(comment)
  } catch (err) {
    next(err)
  }
}

export const getCommentsByPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const postId = parseInt(req.params.postId)
    const comments = await CommentService.getCommentListByPost(postId)
    res.json(comments)
  } catch (err) {
    next(err)
  }
}

export const updateComment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { content } = req.body
    const commentId = parseInt(req.params.id)
    const userId = (req as any).user.id

    const updated = await CommentService.editComment(commentId, userId, content)
    res.json(updated)
  } catch (err) {
    next(err)
  }
}

export const deleteComment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const commentId = parseInt(req.params.id)
    const userId = (req as any).user.id

    await CommentService.deleteComment(commentId, userId)
    res.status(204).send()
  } catch (err) {
    next(err)
  }
}

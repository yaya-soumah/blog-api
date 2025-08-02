import { Request, Response } from 'express'

import { CommentService } from '../services/comment.service'
import { error, success } from '../utils/response.util'
import { AppError } from '../utils/app-error.util'

const getObject = (req: Request) => {
  return (req as any).user
}

export const createComment = async (req: Request, res: Response) => {
  try {
    const { content, postId } = req.body
    const { userId } = getObject(req)

    const comment = await CommentService.addComment(userId, postId, content)
    success(res, 201, comment)
  } catch (err) {
    error(res, (err as AppError).statusCode, (err as AppError).message)
  }
}

export const getCommentsByPost = async (req: Request, res: Response) => {
  try {
    const postId = parseInt(req.params.postId)
    const comments = await CommentService.getCommentListByPost(postId)
    success(res, 200, comments)
  } catch (err) {
    error(res, (err as AppError).statusCode, (err as AppError).message)
  }
}

export const updateComment = async (req: Request, res: Response) => {
  try {
    const { content } = req.body
    const commentId = parseInt(req.params.id)
    const { userId } = getObject(req)

    const updated = await CommentService.editComment(commentId, userId, content)
    success(res, 200, updated)
  } catch (err) {
    error(res, (err as AppError).statusCode, (err as AppError).message)
  }
}

export const deleteComment = async (req: Request, res: Response) => {
  try {
    const commentId = parseInt(req.params.id)
    const { userId } = getObject(req)

    await CommentService.deleteComment(commentId, userId)
    success(res, 204, {})
  } catch (err) {
    error(res, (err as AppError).statusCode, (err as AppError).message)
  }
}

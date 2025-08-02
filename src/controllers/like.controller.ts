import { Request, Response } from 'express'

import { LikeService } from '../services/like.service'
import { error, success } from '../utils/response.util'
import { AppError } from '../utils/app-error.util'

export const likePost = async (req: Request, res: Response) => {
  try {
    const postId = parseInt(req.params.postId)
    const userId = (req as any).user.userId

    const result = await LikeService.toggleLike(userId, postId)
    success(res, 200, result)
  } catch (err) {
    error(res, (err as AppError).statusCode, (err as AppError).message)
  }
}

export const getPostLikes = async (req: Request, res: Response) => {
  try {
    const postId = parseInt(req.params.postId)
    const data = await LikeService.getPostLikes(postId)

    success(res, 200, data)
  } catch (err) {
    error(res, (err as AppError).statusCode, (err as AppError).message)
  }
}

export const likeComment = async (req: Request, res: Response) => {
  try {
    const commentId = parseInt(req.params.commentId)
    const userId = (req as any).user.userId
    const data = await LikeService.toggleCommentLike(userId, commentId)
    success(res, 200, data)
  } catch (err) {
    error(res, (err as AppError).statusCode, (err as AppError).message)
  }
}

export const getUsersWhoLikedPost = async (req: Request, res: Response) => {
  try {
    const postId = parseInt(req.params.postId)
    const data = await LikeService.getUsersWhoLikedPost(postId)
    success(res, 200, data)
  } catch (err) {
    error(res, (err as AppError).statusCode, (err as AppError).message)
  }
}

export const getUsersWhoLikedComment = async (req: Request, res: Response) => {
  try {
    const commentId = parseInt(req.params.commentId)
    const data = await LikeService.getUsersWhoLikedComment(commentId)
    success(res, 200, data)
  } catch (err) {
    error(res, (err as AppError).statusCode, (err as AppError).message)
  }
}

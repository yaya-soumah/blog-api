import { Request, Response, NextFunction } from 'express'
import { LikeService } from '../services/like.service.js'

export const likePost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const postId = parseInt(req.params.postId)
    const userId = (req as any).user.userId

    const result = await LikeService.toggleLike(userId, postId)
    res.json(result)
  } catch (err) {
    next(err)
  }
}

export const getPostLikes = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const postId = parseInt(req.params.postId)
    const data = await LikeService.getPostLikes(postId)

    res.json(data)
  } catch (err) {
    next(err)
  }
}

export const likeComment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const commentId = parseInt(req.params.commentId)
    const userId = (req as any).user.userId
    const data = await LikeService.toggleCommentLike(userId, commentId)
    res.json(data)
  } catch (err) {
    next(err)
  }
}

export const getUsersWhoLikedPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const postId = parseInt(req.params.postId)
    const data = await LikeService.getUsersWhoLikedPost(postId)
    res.json(data)
  } catch (err) {
    next(err)
  }
}

export const getUsersWhoLikedComment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const commentId = parseInt(req.params.commentId)
    const data = await LikeService.getUsersWhoLikedComment(commentId)
    res.json(data)
  } catch (err) {
    next(err)
  }
}

import { Request, Response } from 'express'

import { PostService } from '../services/post.service'
import { getPagination } from '../utils/pagination'
import { AppError } from '../utils/app-error.util'
import { error, success } from '../utils/response.util'

const getObject = (req: Request) => {
  return (req as any).user
}
export const getPosts = async (req: Request, res: Response) => {
  const { page, limit, offset, filters } = await getPagination(req.query)
  try {
    const { userId } = getObject(req)
    const posts = await PostService.getAllPosts(userId, page, limit, offset, filters)
    success(res, 200, posts)
  } catch (err) {
    error(res, (err as AppError).statusCode, (err as AppError).message)
  }
}

export const createPost = async (req: Request, res: Response) => {
  try {
    const { userId } = getObject(req)

    const post = await PostService.createPost({ ...req.body, userId })
    success(res, 201, post)
  } catch (err) {
    error(res, (err as AppError).statusCode, (err as AppError).message)
  }
}

export const getOne = async (req: Request, res: Response) => {
  try {
    const { userId } = getObject(req)
    const postId = Number(req.params.id)
    const post = await PostService.getOne(userId, postId)
    success(res, 200, post)
  } catch (err) {
    error(res, (err as AppError).statusCode, (err as AppError).message)
  }
}

export const deletePost = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id)
    const { userId } = getObject(req)

    await PostService.deletePost(id, userId)
    success(res, 204, {})
  } catch (err) {
    error(res, (err as AppError).statusCode, (err as AppError).message)
  }
}
export const updatePost = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id)
    const { userId } = getObject(req)

    const updated = await PostService.updatePost(id, userId, req.body)
    success(res, 200, updated)
  } catch (err) {
    error(res, (err as AppError).statusCode, (err as AppError).message)
  }
}

import { NextFunction, Request, Response } from 'express'
import { PostService } from '../services/post.service.js'

export const getPosts = async (req: Request, res: Response, next: NextFunction) => {
  const query = (req as any).validated_query
  const page = parseInt(query.page as string) || 1
  const limit = parseInt(query.limit as string) || 10
  const search = (query.search as string) || ''

  try {
    const posts = await PostService.getAllPosts({ page, limit, search })
    res.json(posts)
  } catch (err) {
    next(err)
  }
}

export const createPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user.userId

    const post = await PostService.createPost({ ...req.body, userId })
    res.status(201).json(post)
  } catch (err) {
    next(err)
  }
}

export const deletePost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id)

    await PostService.deletePost(id)
    res.status(204).send()
  } catch (err) {
    next(err)
  }
}
export const updatePost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id)

    const updated = await PostService.updatePost(id, req.body)
    res.json(updated)
  } catch (err) {
    next(err)
  }
}

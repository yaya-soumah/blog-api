import { PostRepository } from '../repositories/post.repository'
import { AppError } from '../utils/app-error.util'

export class PostService {
  static async getOne(userId: number, postId: number) {
    const post = await PostRepository.findOne(userId, postId)
    if (!post) throw new AppError('post not found', 400)
    return post
  }
  static async getAllPosts(
    userId: number,
    page: number,
    limit: number,
    offset: number,
    filters: any,
  ) {
    const { users, total } = await PostRepository.findAllPosts(limit, offset, filters)
    return { users, total, page, limit, totalPages: Math.ceil(total / limit) }
  }

  static async createPost(data: { title: string; content: string; userId: number }) {
    return PostRepository.create(data)
  }

  static async deletePost(id: number, userId: number) {
    const deleted = await PostRepository.deleteById(id, userId)
    if (deleted === 0) throw new AppError('Post not found', 404)

    return true
  }

  static async updatePost(
    id: number,
    userId: number,
    data: Partial<{ title: string; content: string }>,
  ) {
    const post = await PostRepository.updateById(id, userId, data)
    if (!post) throw new AppError('Post not found or unchanged', 404)
    return post
  }
}

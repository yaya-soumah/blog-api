import { CommentRepository } from '../repositories/comment.repository'
import { PostRepository } from '../repositories/post.repository'
import { AppError } from '../utils/app-error.util'

export class CommentService {
  static async addComment(userId: number, postId: number, content: string) {
    const post = await PostRepository.findById(postId)
    if (!post) throw new AppError('Post not found', 404)

    return await CommentRepository.createComment({ userId, postId, content })
  }

  static async getCommentListByPost(postId: number) {
    const post = await PostRepository.findById(postId)
    if (!post) throw new AppError('Post not found', 404)

    return await CommentRepository.findCommentByPostId(postId)
  }

  static async editComment(commentId: number, userId: number, content: string) {
    const comment = await CommentRepository.updateComment(commentId, { content })
    if (!comment) throw new AppError('Comment not found', 404)
    if (comment.userId !== userId) throw new AppError('Not authorized', 403)

    return comment
  }

  static async deleteComment(commentId: number, userId: number) {
    const comment = await CommentRepository.findCommentById(commentId)
    if (!comment) throw new AppError('Comment not found', 404)

    if (comment.userId !== userId) throw new AppError('Not authorized', 403)

    return CommentRepository.deleteComment(commentId)
  }
}

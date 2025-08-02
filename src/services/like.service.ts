import { CommentRepository } from '../repositories/comment.repository'
import { LikeRepository } from '../repositories/like.repository'
import { UserRepository } from '../repositories/user.repository'
import { notify } from '../utils/send-notification.util'
import { AppError } from '../utils/app-error.util'
import { PostRepository } from '../repositories/post.repository'

export class LikeService {
  static async toggleLike(userId: number, postId: number) {
    const post = await PostRepository.findById(postId)
    if (!post) throw new AppError('Post not found', 404)

    const existing = await LikeRepository.findLike(userId, postId)

    if (existing) {
      existing.active = !existing.active
      existing.save()
      //send notification

      if (existing.active && post.userId != userId) {
        const user = await UserRepository.findById(userId)
        await notify(post.userId, user?.name || 'Someone', 'post')
      }
      return existing
    }

    const like = await LikeRepository.createLike({ userId, postId, active: true })
    return like
  }

  static async getPostLikes(postId: number) {
    const post = await PostRepository.findById(postId)
    if (!post) throw new AppError('Post not found', 404)

    const count = await LikeRepository.countLikes(postId)
    return { postId, likes: count }
  }

  static async toggleCommentLike(userId: number, commentId: number) {
    const comment = await CommentRepository.findCommentById(commentId)
    if (!comment) throw new AppError('Comment not found', 404)

    const existing = await LikeRepository.findCommentLike(userId, commentId)

    if (existing) {
      existing.active = !existing.active
      existing.save()
      //notify
      if (existing.active && userId !== comment.userId) {
        console.log('notify')
        const user = await UserRepository.findById(userId)
        await notify(comment.userId, user?.name || 'Someone', 'comment')
      }
      return existing
    }
    const like = await LikeRepository.createLike({ userId, commentId, active: true })
    return like
  }

  static async getUsersWhoLikedPost(postId: number) {
    const post = await PostRepository.findById(postId)
    if (!post) throw new AppError('Post not found', 404)

    return LikeRepository.findUsersWhoLikedPost(postId)
  }

  static async getUsersWhoLikedComment(commentId: number) {
    const comment = await CommentRepository.findCommentById(commentId)
    if (!comment) throw new AppError('Comment not found', 404)

    return LikeRepository.findUsersWhoLikedComment(commentId)
  }
}

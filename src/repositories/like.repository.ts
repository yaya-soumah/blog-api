import { Like } from '../models/like.model'
import { User } from '../models/user.model'

export class LikeRepository {
  static async findLike(userId: number, postId: number) {
    return Like.findOne({ where: { userId, postId } })
  }

  static async findCommentLike(userId: number, commentId: number) {
    return Like.findOne({ where: { userId, commentId } })
  }

  static async createLike(data: any) {
    return Like.create(data)
  }

  static async deleteLike(like: Like) {
    return like.destroy()
  }

  static async countLikes(postId: number) {
    return Like.count({ where: { postId } })
  }

  static async findUsersWhoLikedPost(postId: number) {
    console.log('postId repo*****', postId)
    return Like.findAll({
      where: { postId },
      include: [{ model: User, attributes: ['id', 'name', 'email'] }],
    })
  }

  static async findUsersWhoLikedComment(commentId: number) {
    console.log('commentId repo*****', commentId)
    return Like.findAll({
      where: { commentId },
      include: [{ model: User, attributes: ['id', 'name', 'email'] }],
    })
  }
}

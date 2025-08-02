import { Comment } from '../models/comment.model'

export class CommentRepository {
  static async findAllComment() {
    return Comment.findAll()
  }

  static async createComment(data: any) {
    return Comment.create(data)
  }

  static async findCommentByPostId(postId: number) {
    return Comment.findAll({
      where: { postId, parentId: null },
      include: [
        {
          model: Comment,
          as: 'replies',
          include: [{ model: Comment, as: 'replies' }],
        },
      ],
    })
  }

  static async findCommentById(id: number) {
    return Comment.findByPk(id)
  }

  static async updateComment(id: number, data: Partial<{ content: string }>) {
    const comment = await Comment.findByPk(id)
    if (!comment) return null
    comment.update(data)
    return comment
  }

  static async deleteComment(id: number) {
    return Comment.destroy({ where: { id } })
  }
}

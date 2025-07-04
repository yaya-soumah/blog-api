import { Comment } from '../models/comment.model.js'

export class CommentRepository {
  static findAllComment() {
    return Comment.findAll()
  }

  static createComment(data: any) {
    return Comment.create(data)
  }

  static findCommentByPostId(postId: number) {
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

  static findCommentById(id: number) {
    return Comment.findByPk(id)
  }

  static updateComment(id: number, data: Partial<{ content: string }>) {
    return Comment.update(data, { where: { id }, returning: true })
  }

  static deleteComment(id: number) {
    return Comment.destroy({ where: { id } })
  }
}

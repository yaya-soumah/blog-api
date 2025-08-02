import { Op } from 'sequelize'

import { Post } from '../models/post.model'

export class PostRepository {
  static async findOne(userId: number, postId: number) {
    return (await Post.findOne({ where: { userId, id: postId } })) || null
  }
  static async findAllPosts(limit: number, offset: number, filters: any) {
    let where: any = {}
    if (filters.title) where.title = { [Op.like]: `%${filters.title}%` }
    if (filters.content) where.content = { [Op.like]: `%${filters.content}%` }

    const { rows, count } = await Post.findAndCountAll({
      where,
      limit,
      offset,
      attributes: { exclude: ['password'] },
      order: [['createdAt', 'DESC']],
    })
    return { users: rows, total: count }
  }

  static async create(data: { title: string; content: string; userId: number }) {
    return Post.create(data)
  }

  static async findById(id: number) {
    return Post.findByPk(id, { include: ['author'] }) || null
  }

  static async deleteById(id: number, userId: number) {
    return Post.destroy({ where: { id, userId } }) || null
  }

  static async updateById(
    id: number,
    userId: number,
    data: Partial<{ title: string; content: string }>,
  ) {
    const post = await Post.findByPk(id)
    if (!post) return null
    post.update(data, { where: { userId } })
    return post
  }
}

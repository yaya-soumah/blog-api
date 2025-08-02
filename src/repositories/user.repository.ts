import { Op } from 'sequelize'

import { User } from '../models/user.model'

export class UserRepository {
  static async findAllWithPosts(limit: number, offset: number, filters: any) {
    let where: any = {}
    if (filters.name) where.name = { [Op.like]: `%${filters.name}%` }
    if (filters.email) where.email = { [Op.like]: `%${filters.email}%` }

    const { rows, count } = await User.findAndCountAll({
      where,
      limit,
      offset,
      attributes: { exclude: ['password'] },
      order: [['createdAt', 'DESC']],
    })
    return { users: rows, total: count }
  }

  static async create(data: { name: string; email: string; password: string; role: any }) {
    return User.create(data)
  }

  static async findById(id: number) {
    return (
      (await User.findByPk(id, { include: ['posts'], attributes: { exclude: ['password'] } })) ||
      null
    )
  }

  static async findByEmail(email: string) {
    return User.findOne({ where: { email } })
  }

  static async updateByRole(id: number, data: Partial<{ role: 'user' | 'admin' }>) {
    const user = await User.findByPk(id, { attributes: { exclude: ['password'] } })
    if (!user) return null
    user.update(data)
    return user
  }
}

import { UserRepository } from '../repositories/user.repository'
import { AppError } from '../utils/app-error.util'

export class UserServices {
  static async getOne(id: number) {
    const user = await UserRepository.findById(id)
    if (!user) throw new AppError('User not found', 404)
    return user
  }
  static async getAllUsers(page: number, limit: number, offset: number, filters: any) {
    const { users, total } = await UserRepository.findAllWithPosts(limit, offset, filters)
    return { users, total, page, limit, totalPages: Math.ceil(total / limit) }
  }

  static async updateUserRole(id: number, role: 'user' | 'admin') {
    console.log('id', id)
    const existing = UserRepository.updateByRole(id, { role })
    if (!existing) throw new AppError('User not found', 404)

    return existing
  }
}

import { NotificationRepository } from '../repositories/notification.repository'
import { UserRepository } from '../repositories/user.repository'
import { AppError } from '../utils/app-error.util'

export class NotificationService {
  static async getUser(recipientId: number) {
    const user = await UserRepository.findById(recipientId)
    if (!user) throw new AppError('Recipient not found', 404)
  }

  static async getAll(recipientId: number) {
    await this.getUser(recipientId)
    return await NotificationRepository.findAll(recipientId)
  }

  static async updateAll(recipientId: number) {
    await this.getUser(recipientId)
    const [count] = await NotificationRepository.updateAll(recipientId)
    if (count === 0) {
      return []
    }
    return await NotificationRepository.findAll(recipientId)
  }
}

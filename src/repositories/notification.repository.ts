import { Notification } from '../models/notification.model'

export class NotificationRepository {
  static async findAll(recipientId: number) {
    return Notification.findAll({ where: { recipientId } })
  }

  static async updateAll(recipientId: number) {
    return Notification.update({ isRead: true }, { where: { recipientId } })
  }
}

import { notificationQueue } from '../queues/notificationQueue.js'

type NotificationPayload = {
  recipientId: number
  senderName: string
  target: 'post' | 'comment'
}

export async function addNotificationJob(payload: NotificationPayload) {
  await notificationQueue.add('new-like', payload)
}

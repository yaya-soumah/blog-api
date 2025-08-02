import { notificationQueue } from '../queues/notificationQueue'

type NotificationPayload = {
  recipientId: number
  senderName: string
  target: 'post' | 'comment'
}

export async function addNotificationJob(payload: NotificationPayload) {
  if (notificationQueue) {
    await notificationQueue.add('new-like', payload)
    console.log('notification sent')
  } else {
    console.log('Notification skipped — no queue available (prod)')
  }
}

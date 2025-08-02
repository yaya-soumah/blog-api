import { addNotificationJob } from '../jobs/addNotificationJob'

export const notify = async (
  recipientId: number,
  senderName: string,
  target: 'post' | 'comment',
) => {
  await addNotificationJob({
    recipientId,
    target,
    senderName,
  })
}

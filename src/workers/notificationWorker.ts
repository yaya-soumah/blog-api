import { Worker } from 'bullmq'
import { connection } from '../queues/notificationQueue.js'
import { Notification } from '../models/index.js'

if (process.env.NODE_ENV !== 'production' && connection) {
  const worker = new Worker(
    'notifications',
    async (job) => {
      const { recipientId, senderName, target } = job.data
      const message = `${senderName} liked your ${target}`

      await Notification.create({
        recipientId,
        type: 'like',
        message,
      })

      console.log(`Notification created for user ${recipientId}`)
    },
    { connection }
  )

  console.log('Notification worker is running...')

  worker.on('failed', (job, err) => {
    console.error(`Job failed: ${job?.id}`, err)
  })

  async function shutdownWorker() {
    console.log('\nShutting down worker...')
    await worker.close()
    await connection!.quit()
    process.exit(0)
  }

  process.on('SIGINT', shutdownWorker)
  process.on('SIGTERM', shutdownWorker)
} else {
  console.log('Worker not started (production or no Redis connection)')
}

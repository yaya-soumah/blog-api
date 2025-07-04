import { Worker } from 'bullmq'
import { connection } from '../queues/notificationQueue.js'
import { Notification } from '../models/index.js'

const worker = new Worker(
  'notifications',
  async job => {
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
  if (connection) {
    await connection.quit()
  }
  console.log('Worker stopped')
  process.exit(0)
}

// Handle process signals
process.on('SIGINT', shutdownWorker)
process.on('SIGTERM', shutdownWorker)

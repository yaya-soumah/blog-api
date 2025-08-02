import { Worker } from 'bullmq'

import { connection } from '../queues/notificationQueue'
import sequelize, { setupModels } from '../config/database'
import { Notification } from '../models'

// Step 1: Setup Sequelize in this worker process
async function initializeWorker() {
  try {
    await sequelize.authenticate()
    setupModels(sequelize)
    console.log('Sequelize initialized in worker')

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
      { connection },
    )

    console.log('Notification worker is running...')

    worker.on('failed', (job, err) => {
      console.error(`Job failed: ${job?.id}`, err)
    })

    const shutdownWorker = async () => {
      console.log('\nShutting down worker...')
      await worker.close()
      await connection?.quit()
      console.log('Worker stopped gracefully')
      process.exit(0)
    }

    process.on('SIGINT', shutdownWorker)
    process.on('SIGTERM', shutdownWorker)
  } catch (error) {
    console.error('Failed to initialize worker Sequelize connection:', error)
    process.exit(1)
  }
}

// Start the worker
initializeWorker()

import { Queue } from 'bullmq'
import IORedis from 'ioredis'
import { config } from 'dotenv'

config()

let connection: IORedis
let notificationQueue: Queue | null = null

connection = new IORedis(process.env.REDIS_URL || '127.0.0.1', {
  maxRetriesPerRequest: null,
})

notificationQueue = new Queue('notifications', {
  connection,
})

export { connection, notificationQueue }

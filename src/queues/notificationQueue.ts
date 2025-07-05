import { Queue } from 'bullmq'
import IORedis from 'ioredis'
import { config } from 'dotenv'

config()

let connection: IORedis | null = null
let notificationQueue: Queue | null = null

if (process.env.NODE_ENV !== 'production') {
  connection = new IORedis({
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: Number(process.env.REDIS_PORT) || 6379,
    maxRetriesPerRequest: null,
  })

  notificationQueue = new Queue('notifications', {
    connection,
  })
} else {
  console.log('Redis disabled in production')
}

export { connection, notificationQueue }

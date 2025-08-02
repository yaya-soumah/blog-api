import sequelize, { setupModels } from '../config/database'
import { connection } from '../queues/notificationQueue'
setupModels(sequelize)

beforeAll(async () => {
  await sequelize.sync({ force: true }) // Only for test
})

afterAll(async () => {
  await sequelize.close()
  await connection?.quit()
})

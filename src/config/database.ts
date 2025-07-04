import { Sequelize } from 'sequelize-typescript'
import { config } from 'dotenv'
import { models } from '../models/index.js'
config()

const isTest = process.env.NODE_ENV === 'test'

const sequelize = isTest
  ? new Sequelize({
      dialect: 'sqlite',
      storage: process.env.TEST_DB_STORAGE ?? ':memory:',
      logging: false,
      models,
    })
  : new Sequelize({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT ?? '5432'),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      models,
      dialectOptions: {
        ssl:
          process.env.NODE_ENV === 'production'
            ? { require: true, rejectUnauthorized: false }
            : undefined,
      },
      logging: process.env.NODE_ENV === 'production' ? false : console.log,
    })

export default sequelize

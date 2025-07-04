import { Sequelize } from 'sequelize-typescript'
import { config } from 'dotenv'
import { models } from '../models/index.js'
config()

const isTest = process.env.NODE_ENV === 'test'

const sequelize = isTest
  ? new Sequelize({
      dialect: 'sqlite',
      storage: process.env.TEST_DB_STORAGE || ':memory:',
      logging: false,
    })
  : new Sequelize({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      models,
      // logging: console.log,
    })

export default sequelize

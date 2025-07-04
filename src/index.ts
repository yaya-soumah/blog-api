import 'reflect-metadata'
import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'
import { config } from 'dotenv'
import cookieParser from 'cookie-parser'
import sequelize from './config/database.js'
import { authenticateToken } from './middleware/auth.js'
import userRouter from './routes/user.routes.js'
import postRouter from './routes/post.routes.js'
import authRouter from './routes/auth.routes.js'
import commentRouter from './routes/comment.routes.js'
import likeRouter from './routes/like.routes.js'
import { AppError } from './utils/app.error.js'
import swaggerRoutes from './routes/swagger.routes.js'
config()

const app = express()
app.use(cors())
const PORT = process.env.PORT || 8080

app.use(express.json())
app.use(cookieParser())

app.get('/', (req, res) => {
  res.send('Hello World!') // Should show in curl
})
app.use('/api/auth', authRouter)
app.use(swaggerRoutes)
// the following routers required Token access
app.use(authenticateToken)
app.use('/api/users', userRouter)
app.use('/api/posts', postRouter)
app.use('/api/comments', commentRouter)
app.use('/api/likes', likeRouter)

async function startServer() {
  try {
    await sequelize.authenticate()
    await sequelize.sync({ alter: true }) // dev only
    console.log('Database connected')
    app.listen(PORT, () => {
      console.log(`Server listening on http://localhost:${PORT}`)
    })
  } catch (error) {
    console.error('Failed to start:', error)
  }
}

startServer()

app.use((_, res) => {
  res.status(404).json({ error: 'Not found' })
})

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const status = err instanceof AppError ? err.statusCode : 500
  const message = err.message || 'Something went wrong'
  console.error('Unexpected Error: ', err)
  res.status(status).json({
    success: false,
    error: message,
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack }),
  })
})

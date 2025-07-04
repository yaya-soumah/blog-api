import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { AppError, throwIf } from '../utils/app.error.js'

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const header = req.headers.authorization
  if (!header || !header.startsWith('Bearer ')) {
    throw new AppError('Unauthorized: missing token', 401)
  }
  try {
    const token = header!.split(' ')[1]
    const decoded = jwt.verify(token!, process.env.JWT_SECRET!) as { userId: number; role: string }
    ;(req as any).user = decoded
    next()
  } catch {
    throwIf(true, 'Invalid or expired token', 401)
  }
}

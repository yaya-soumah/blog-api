import {Request, Response, NextFunction} from 'express'
import { AppError } from '../utils/app.error'

export const adminOnly = (role: 'admin') => 
async (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user

    if (user.role !== role) throw new AppError('Forbidden: Only Admin is allowed', 403)
    
    next()
}
import { Request, Response } from 'express'

import { NotificationService } from '../services/notification.service'
import { AppError } from '../utils/app-error.util'
import { success, error } from '../utils/response.util'
import { Notification } from '../models'

const getObject = (req: Request) => (req as any).user

export const getAll = async (req: Request, res: Response) => {
  try {
    const { userId: recipientId } = getObject(req)
    const notes = await Notification.findAll()
    console.log('notes', notes)
    const notifications = await NotificationService.getAll(recipientId)
    success(res, 200, notifications)
  } catch (err) {
    error(res, (err as AppError).statusCode, (err as AppError).message)
  }
}

export const updateAll = async (req: Request, res: Response) => {
  try {
    const { userId: recipientId } = getObject(req)
    const notifications = await NotificationService.updateAll(recipientId)
    success(res, 200, notifications)
  } catch (err) {
    error(res, (err as AppError).statusCode, (err as AppError).message)
  }
}

import { Request, Response } from 'express'

import { UserServices } from '../services/user.service'
import { getPagination } from '../utils/pagination'
import { error, success } from '../utils/response.util'
import { AppError } from '../utils/app-error.util'

export const getUsers = async (req: Request, res: Response) => {
  try {
    const { page, limit, offset, filters } = await getPagination(req.query)

    const users = await UserServices.getAllUsers(page, limit, offset, filters)
    success(res, 200, users)
  } catch (err) {
    error(res, (err as AppError).statusCode, (err as AppError).message)
  }
}

export const getOne = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user
    console.log('id profile', user.userId)
    const existing = await UserServices.getOne(user.userId)
    success(res, 200, existing)
  } catch (err) {
    error(res, (err as AppError).statusCode, (err as AppError).message)
  }
}

export const updateUserRole = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id)

    const { role } = req.body
    const user = await UserServices.updateUserRole(id, role)
    success(res, 200, user)
  } catch (err) {
    error(res, (err as AppError).statusCode, (err as AppError).message)
  }
}

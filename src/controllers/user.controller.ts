import { Request, Response } from 'express'
import { UserServices } from '../services/user.service.js'

export const getUsers = async (_: Request, res: Response) => {
  const users = await UserServices.getAllUsers()
  res.json(users)
}

export const createUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body
  const user = await UserServices.createUser({ name, email, password })
  res.status(201).json(user)
}

export const updateUserRole = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id)

  const { role } = req.body
  const user = await UserServices.updqateUserRole(id, role)
  res.status(201).json(user)
}

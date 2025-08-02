import { Request, Response } from 'express'

import { AuthService } from '../services/auth.service'
import { AppError } from '../utils/app-error.util'
import { success, error } from '../utils/response.util'

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body
    const { accessToken, user, refreshToken } = await AuthService.login(email, password)

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    })
    success(res, 200, { token: accessToken, user })
  } catch (err) {
    error(res, (err as AppError).statusCode, (err as AppError).message)
  }
}

export const register = async (req: Request, res: Response) => {
  try {
    const role = req.query.role || 'user'
    const { accessToken, user, refreshToken } = await AuthService.register({ ...req.body, role })

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    })
    success(res, 201, { token: accessToken, user })
  } catch (err) {
    error(res, (err as AppError).statusCode, (err as AppError).message)
  }
}

export const refreshAccessToken = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.refreshToken

    if (!token) throw new AppError('Refresh token required.', 401)

    const { newToken } = await AuthService.refresh(token)

    success(res, 200, { token: newToken })
  } catch (err) {
    error(res, (err as AppError).statusCode, (err as AppError).message)
  }
}

export const logout = (_req: Request, res: Response) => {
  try {
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    })
    success(res, 200, { message: 'Logged out successfully' })
  } catch (err) {
    error(res, (err as AppError).statusCode, (err as AppError).message)
  }
}

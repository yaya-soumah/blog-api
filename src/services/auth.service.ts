import { User } from '../models/user.model.js'
import { UserRepository } from '../repositories/user.repository.js'
import { AppError, throwIf } from '../utils/app.error.js'

import { signAccessToken, signRefreshToken } from '../utils/jwt.js'

export class AuthService {
  static getToken(id: number, role: string) {
    const accessToken = signAccessToken({ userId: id, role })
    const refreshToken = signRefreshToken({ userId: id })
    return { accessToken, refreshToken }
  }
  static async login(email: string, password: string) {
    const user = await UserRepository.findByEmail(email)
    if (!user) throw new AppError('Invalid email credentials', 401)

    const valid = await user?.comparePassword(password)
    if (!valid) throw new AppError('Invalid password credentials', 401)

    const { accessToken, refreshToken } = this.getToken(user.id, user.role)

    return {
      accessToken,
      refreshToken,
      user: { id: user?.id, email: user?.email, name: user?.name, role: user?.role },
    }
  }

  static async register(data: { name: string; email: string; password: string }) {
    const exists = await UserRepository.findByEmail(data.email)
    if (exists) throw new AppError('Email already taken', 409)

    const user = await UserRepository.create(data)
    const { accessToken, refreshToken } = this.getToken(user.id, user.role)

    return {
      accessToken,
      refreshToken,
      user: { id: user?.id, email: user?.email, name: user?.name, role: user?.role },
    }
  }
}

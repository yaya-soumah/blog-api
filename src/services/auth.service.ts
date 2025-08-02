import { UserRepository } from '../repositories/user.repository'
import { AppError } from '../utils/app-error.util'
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '../utils/jwt'

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

  static async register(data: { name: string; email: string; password: string; role: any }) {
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

  static async refresh(refreshToken: string) {
    try {
      const decode = verifyRefreshToken(refreshToken) as { id: number; role: 'user' | 'admin' }
      const newToken = signAccessToken({ userId: decode.id, role: decode.role })
      return { newToken }
    } catch {
      throw new AppError('Invalid refresh token', 400, true)
    }
  }
}

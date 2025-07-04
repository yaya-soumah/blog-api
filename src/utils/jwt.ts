import jwt from 'jsonwebtoken'
import { config } from 'dotenv'

config()


const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || '6d78ef6d06d7d70598c687fb8f4d6168ecd62d0b3e1f2094a6e39edaa0146d22-access'
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'fallback-f99ddc567a19732bb0b648dc335b16e1e0011e6151770fbff805eed86741de56'

export function signAccessToken(payload: {userId: number, role: string}) {
  return jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: '1d' })
}

export function signRefreshToken(payload: object) {
  return jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: '7d' })
}

export function verifyRefreshToken(token: string) {
  return jwt.verify(token, REFRESH_TOKEN_SECRET)
}

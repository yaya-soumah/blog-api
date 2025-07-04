import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/auth.service.js";
import { signAccessToken, signRefreshToken, verifyRefreshToken } from "../utils/jwt.js";
import { AppError } from "../utils/app.error.js";


export const login = async (req: Request, res:Response, next: NextFunction) => {
    try {
        const {email, password} = req.body
        const {accessToken ,user, refreshToken} = await AuthService.login(email,password)
        
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        })
        res.status(200).json({accessToken, user})
    } catch (err) {
        next(err)
    }
}

export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {accessToken ,user, refreshToken} = await AuthService.register(req.body)
        
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        })
        res.status(200).json({accessToken, user})
    } catch (err) {
        next(err)
    }
}


export const refreshAccessToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.refreshToken

        if (!token) throw new AppError("Refresh token required.", 401)
        
        const decoded = verifyRefreshToken(token) as {userId: number, role:'user'| 'admin'}
        const newAccessToken = signAccessToken({userId: decoded.userId, role: decoded.role})
        res.json({accessToken: newAccessToken})
    } catch (err) {
        next(err)
    }
}

export const logout = (_req: Request, res: Response) => {
  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  })
  res.status(200).json({ message: 'Logged out successfully' })
}


import request from 'supertest'

import app from '../app'
import { AuthService } from '../services/auth.service'

import { base_url } from './utils'

describe('Auth API', () => {
  const userData = { name: 'user', email: 'user@example.com', password: 'password123' }
  describe('POST /auth/register', () => {
    it('Should register a user', async () => {
      const res = await request(app)
        .post(base_url + '/auth/register')
        .send(userData)

      expect(res.status).toBe(201)
      expect(res.body.data).toHaveProperty('token')
    })

    it('Should throw error for missing credential', async () => {
      const res = await request(app)
        .post(base_url + '/auth/register')
        .send({ name: userData.name, password: userData.password })

      expect(res.status).toBe(400)
      expect(res.body.message).toBe('Validation failed')
    })
  })

  describe('', () => {
    beforeAll(async () => {
      await request(app)
        .post(base_url + '/auth/register')
        .send({ name: userData.name, password: userData.password })
    })

    describe('POST /auth/login', () => {
      it('Should login a user', async () => {
        const res = await request(app)
          .post(base_url + '/auth/login')
          .send({ email: userData.email, password: userData.password })

        expect(res.status).toBe(200)
        expect(res.body.data).toHaveProperty('token')
      })

      it('Should throw error for invalid credential', async () => {
        const res = await request(app)
          .post(base_url + '/auth/register')
          .send({ name: userData.name, password: 'invalid' })

        expect(res.status).toBe(400)
        expect(res.body.message).toBe('Validation failed')
      })
      it('Should throw error for missing credential', async () => {
        const res = await request(app)
          .post(base_url + '/auth/register')
          .send({ name: userData.name })

        expect(res.status).toBe(400)
        expect(res.body.message).toBe('Validation failed')
      })
    })
    describe('POST /auth/refresh', () => {
      it('Should return new token', async () => {
        const { accessToken, refreshToken } = await AuthService.login(
          userData.email,
          userData.password,
        )
        const sessionCookie = `refreshToken=${refreshToken}; HttpOnly; Secure=false; SameSite=strict`
        const res = await request(app)
          .post(base_url + '/auth/refresh')
          .set('Authorization', `Bearer ${accessToken}`)
          .set('Cookie', [sessionCookie])

        expect(res.status).toBe(200)
        expect(res.body.data).toHaveProperty('token')
      })

      it('Should throw error for missing cookie', async () => {
        const { accessToken } = await AuthService.login(userData.email, userData.password)
        const res = await request(app)
          .post(base_url + '/auth/refresh')
          .set('Authorization', `Bearer ${accessToken}`)

        expect(res.status).toBe(401)
        expect(res.body.message).toBe('Refresh token required.')
      })
    })
    describe('POST /auth/logout', () => {
      it('Should logout', async () => {
        const { accessToken, refreshToken } = await AuthService.login(
          userData.email,
          userData.password,
        )
        const sessionCookie = `refreshToken=${refreshToken}; HttpOnly; Secure=false; SameSite=strict`
        const res = await request(app)
          .post(base_url + '/auth/logout')
          .set('Authorization', `Bearer ${accessToken}`)
          .set('Cookie', [sessionCookie])

        expect(res.status).toBe(200)
        expect(res.body.data.message).toBe('Logged out successfully')
      })
    })
  })
})

import request from 'supertest'

import app from '../app'

import { base_url } from './utils'
import { userFactory } from './factories/user.factory'

describe('User API', () => {
  let token = ''
  let user: any
  const userData = userFactory()
  beforeAll(async () => {
    const res = await request(app)
      .post(base_url + '/auth/register?role=admin')
      .send(userData)

    token = res.body.data.token
    user = res.body.data.user
  })
  describe('GET /users', () => {
    it('Should get users list', async () => {
      const res = await request(app)
        .get(base_url + '/users')
        .set('Authorization', `Bearer ${token}`)

      expect(res.status).toBe(200)
      expect(Array.isArray(res.body.data)).toBeTruthy()
    })
    it('Should throw error for missing token', async () => {
      const res = await request(app).get(base_url + '/users')

      expect(res.status).toBe(401)
    })
  })

  describe('GET /users:id', () => {
    it('Should get user by id', async () => {
      const res = await request(app)
        .get(base_url + '/users/profile')
        .set('Authorization', `Bearer ${token}`)
      console.log('res.body', res.body)
      expect(res.status).toBe(200)
    })

    it('Should throw error for missing token', async () => {
      const res = await request(app).get(base_url + '/users/profile')

      expect(res.status).toBe(401)
    })
  })

  describe('PUT /users/:id', () => {
    it('Should update role', async () => {
      const res = await request(app)
        .put(base_url + `/users/${user.id}/role`)
        .set('Authorization', `Bearer ${token}`)
        .send({ role: 'user' })

      expect(res.status).toBe(200)
      expect(res.body.data.role).toBe('user')
    })
    it('Should throw error for missing data', async () => {
      const res = await request(app)
        .put(base_url + `/users/${user.id}/role`)
        .set('Authorization', `Bearer ${token}`)
        .send({})

      expect(res.status).toBe(400)
    })
  })
})

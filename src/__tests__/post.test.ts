import request from 'supertest'

import app from '../app'

import { userFactory } from './factories/user.factory'
import { postFactory } from './factories/post.factory'
import { base_url } from './utils'

describe('Post API', () => {
  let token = ''
  let user: any
  let postData: any
  const userData = userFactory()
  beforeAll(async () => {
    const res = await request(app)
      .post(base_url + '/auth/register?role=admin')
      .send(userData)

    token = res.body.data.token
    user = res.body.data.user

    postData = postFactory({ userId: user.id })
  })

  describe('POST /posts', () => {
    it('Should create a post', async () => {
      const res = await request(app)
        .post(base_url + '/posts')
        .set('Authorization', `Bearer ${token}`)
        .send(postData)

      expect(res.status).toBe(201)
    })
    it('Should throw error for missing data', async () => {
      const res = await request(app)
        .post(base_url + '/posts')
        .set('Authorization', `Bearer ${token}`)
        .send({ title: 'new title' })

      expect(res.status).toBe(400)
    })
    it('Should throw error for token', async () => {
      const res = await request(app)
        .post(base_url + '/posts')
        .send(postData)

      expect(res.status).toBe(401)
    })
  })

  describe('GET /posts', () => {
    it('Should get all post', async () => {
      const res = await request(app)
        .get(base_url + '/posts')
        .set('Authorization', `Bearer ${token}`)

      expect(res.status).toBe(200)
    })
    it('Should throw error for missing token', async () => {
      const res = await request(app).get(base_url + '/posts')

      expect(res.status).toBe(401)
    })
  })

  describe('Read, Update, Delete', () => {
    let post: any
    beforeAll(async () => {
      const res = await request(app)
        .post(base_url + '/posts')
        .set('Authorization', `Bearer ${token}`)
        .send(postData)

      post = res.body.data
    })

    describe('GET /posts/:id', () => {
      it('Should get one post by id', async () => {
        const res = await request(app)
          .get(base_url + `/posts/${post.id}`)
          .set('Authorization', `Bearer ${token}`)

        expect(res.status).toBe(200)
      })
      it('Should throw error for missing token', async () => {
        const res = await request(app).get(base_url + `/posts/${post.id}`)

        expect(res.status).toBe(401)
      })
    })

    describe('PUT /posts/:id', () => {
      it('Should update one post by id', async () => {
        const res = await request(app)
          .put(base_url + `/posts/${post.id}`)
          .set('Authorization', `Bearer ${token}`)
          .send({ title: 'updated title' })

        expect(res.status).toBe(200)
        expect(res.body.data.title).toBe('updated title')
      })
      it('Should throw error for missing data', async () => {
        const res = await request(app)
          .put(base_url + `/posts/${post.id}`)
          .set('Authorization', `Bearer ${token}`)

        expect(res.status).toBe(400)
      })
    })

    describe('DELETE /posts/:id', () => {
      it('Should update one post by id', async () => {
        const res = await request(app)
          .delete(base_url + `/posts/${post.id}`)
          .set('Authorization', `Bearer ${token}`)

        expect(res.status).toBe(204)
      })
      it('Should throw error for missing data', async () => {
        const res = await request(app).delete(base_url + `/posts/${post.id}`)

        expect(res.status).toBe(401)
      })
    })
  })
})

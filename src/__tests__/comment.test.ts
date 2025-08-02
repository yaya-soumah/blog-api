import request from 'supertest'

import app from '../app'

import { commentFactory } from './factories/comment.factory'
import { userFactory } from './factories/user.factory'
import { postFactory } from './factories/post.factory'
import { base_url } from './utils'

describe('Comment API', () => {
  let token = ''
  let user: any
  let postData: any
  let commentData: any
  let post: any
  const userData = userFactory()
  beforeAll(async () => {
    const res = await request(app)
      .post(base_url + '/auth/register?role=admin')
      .send(userData)

    token = res.body.data.token
    user = res.body.data.user

    postData = postFactory({ userId: user.id })

    const res_post = await request(app)
      .post(base_url + '/posts')
      .set('Authorization', `Bearer ${token}`)
      .send(postData)

    post = res_post.body.data

    commentData = commentFactory({ userId: user.id, postId: post.id })
  })

  describe('POST /comments', () => {
    it('Should create a comment', async () => {
      const res = await request(app)
        .post(base_url + '/comments')
        .set('Authorization', `Bearer ${token}`)
        .send(commentData)

      expect(res.status).toBe(201)
    })
    it('Should throw error for missing data', async () => {
      const res = await request(app)
        .post(base_url + '/comments')
        .set('Authorization', `Bearer ${token}`)
        .send({ content: 'new content' })

      expect(res.status).toBe(400)
    })
    it('Should throw error for missing token', async () => {
      const res = await request(app)
        .post(base_url + '/comments')
        .send(commentData)

      expect(res.status).toBe(401)
    })
  })

  describe('GET /comments/post/:postId', () => {
    it('Should get all comments of a post', async () => {
      const res = await request(app)
        .get(base_url + `/comments/post/${post.id}`)
        .set('Authorization', `Bearer ${token}`)

      expect(res.status).toBe(200)
    })
    it('Should throw error for missing token', async () => {
      const res = await request(app).get(base_url + `/comments/post/${post.id}`)

      expect(res.status).toBe(401)
    })
  })

  describe('Read, Update, Delete', () => {
    let comment: any
    beforeAll(async () => {
      const res = await request(app)
        .post(base_url + '/comments')
        .set('Authorization', `Bearer ${token}`)
        .send(commentData)

      comment = res.body.data
    })

    describe('PUT /comments/:id', () => {
      it('Should update one comment by id', async () => {
        const res = await request(app)
          .put(base_url + `/comments/${comment.id}`)
          .set('Authorization', `Bearer ${token}`)
          .send({ content: 'updated content' })

        expect(res.status).toBe(200)
        expect(res.body.data.content).toBe('updated content')
      })
      it('Should throw error for missing data', async () => {
        const res = await request(app)
          .put(base_url + `/comments/${comment.id}`)
          .set('Authorization', `Bearer ${token}`)

        expect(res.status).toBe(400)
      })
    })

    describe('DELETE /comments/:id', () => {
      it('Should update one comment by id', async () => {
        const res = await request(app)
          .delete(base_url + `/comments/${comment.id}`)
          .set('Authorization', `Bearer ${token}`)

        expect(res.status).toBe(204)
      })
      it('Should throw error for missing data', async () => {
        const res = await request(app).delete(base_url + `/comments/${comment.id}`)

        expect(res.status).toBe(401)
      })
    })
  })
})

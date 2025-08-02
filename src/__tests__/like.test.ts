import request from 'supertest'

import app from '../app'

import { userFactory } from './factories/user.factory'
import { postFactory } from './factories/post.factory'
import { commentFactory } from './factories/comment.factory'
import { likeFactory } from './factories/like.factory'
import { base_url } from './utils'

describe('Post API', () => {
  let token = ''
  let user: any
  let postData: any
  let post: any
  let comment: any
  let commentData: any
  let likeData: any
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
    const res_comment = await request(app)
      .post(base_url + '/comments')
      .set('Authorization', `Bearer ${token}`)
      .send(commentData)
    comment = res_comment.body.data

    likeData = likeFactory({ userId: user.id, postId: post.id, commentId: comment.id })
  })

  describe('POST /likes/:postId', () => {
    it('Should like a post', async () => {
      const res = await request(app)
        .post(base_url + `/likes/${post.id}`)
        .set('Authorization', `Bearer ${token}`)
        .send(likeData)

      expect(res.status).toBe(200)
    })

    it('Should throw error for token', async () => {
      const res = await request(app)
        .post(base_url + `/likes/${post.id}`)
        .send(likeData)

      expect(res.status).toBe(401)
    })
  })

  describe('GET /likes/:postId', () => {
    it('Should get all posts likes by a user', async () => {
      const res = await request(app)
        .get(base_url + `/likes/${post.id}`)
        .set('Authorization', `Bearer ${token}`)
      console.log('all post liked', res.body)
      expect(res.status).toBe(200)
    })
    it('Should throw error for missing token', async () => {
      const res = await request(app).get(base_url + `/likes/${post.id}`)

      expect(res.status).toBe(401)
    })
  })

  describe('GET /likes/post/postId/users', () => {
    it('Should get list of users who like a post', async () => {
      const res = await request(app)
        .get(base_url + `/likes/post/${post.id}/users`)
        .set('Authorization', `Bearer ${token}`)
      expect(res.status).toBe(200)
    })

    it('Should throw error for missing token', async () => {
      const res = await request(app).get(base_url + `/likes/post/{post.id}/users`)

      expect(res.status).toBe(401)
    })
  })

  describe('POST /likes/comment/:commentId', () => {
    it('Should like a comment', async () => {
      const res = await request(app)
        .post(base_url + `/likes/comment/${comment.id}`)
        .set('Authorization', `Bearer ${token}`)
        .send(likeData)

      expect(res.status).toBe(200)
    })

    it('Should throw error for token', async () => {
      const res = await request(app)
        .post(base_url + `/likes/comment/${comment.id}`)
        .send(likeData)

      expect(res.status).toBe(401)
    })
  })

  describe('GET /likes/comment/commentId/users', () => {
    it('Should get list of users who like a comment', async () => {
      const res = await request(app)
        .get(base_url + `/likes/comment/${comment.id}/users`)
        .set('Authorization', `Bearer ${token}`)
      expect(res.status).toBe(200)
    })
    it('Should throw error for missing token', async () => {
      const res = await request(app).get(base_url + `/likes/comment/{comment.id}/users`)

      expect(res.status).toBe(401)
    })
  })
})

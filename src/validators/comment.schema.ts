import { z } from 'zod'

export const createCommentSchema = z.object({
  content: z.string().min(1, 'Comment is required'),
  postId: z.number(),
  parentId: z.number().optional().nullable(),
})

export const updateCommentSchema = z.object({
  content: z.string().min(1, 'Updated content is required'),
})

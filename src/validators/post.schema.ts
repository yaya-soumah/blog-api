import { z } from 'zod'

export const createPostSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
})

export const getPostsSchema = z.object({
  page: z
    .string()
    .transform(Number)
    .refine((val) => val > 0, { message: 'Page must be greater than 0' })
    .optional(),
  limit: z
    .string()
    .transform(Number)
    .refine((val) => val > 0, { message: 'Limit must be greater than 0' })
    .optional(),
  search: z.string().optional(),
})

export const UpdatePostSchema = z.object({
  title: z.string().optional(),
  content: z.string().optional(),
})

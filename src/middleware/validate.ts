import { Request, Response, NextFunction, RequestHandler } from 'express'
import { ZodSchema } from 'zod'

export const validate = (schema: ZodSchema<any>): RequestHandler => {
  return (req, res, next) => {
    const result = schema.safeParse(req.body)
    if (!result.success) {
      res.status(400).json({
        error: 'Validation failed',
        details: result.error,
      })
      return 
    }
    console.log("****", result.data)
    req.body = result.data 
    next()
  }
}

export function validateQuery(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.query)
      if (!result.success) {
        res.status(400).json({
          message: 'Invalid query parameters',
          errors: result.error.flatten().fieldErrors,
        })
      }
      (req as any).validated_query=result.data
      
      next()
  }
}

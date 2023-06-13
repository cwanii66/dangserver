import type { Context } from 'koa'
import type Koa from 'koa'
import Logger from '../common/Logger'
import { verifyToken } from '../controller/BaseController'

export async function globalExceptionHandler(ctx: Context, next: Koa.Next) {
  Logger.debug('enter common exception handler')
  try {
    if (!ctx.request.originalUrl.includes('login')) {
      const headerAuthorization = ctx.request.req.headers.authorization
      if (headerAuthorization) {
        const token = headerAuthorization.split(' ')[1]
        verifyToken(token) // verify token here
      }
    }
    await next()
  }
  catch (e: unknown) {
    const error = e as Error
    switch (error.name) {
      case 'JsonWebTokenError':
        ctx.body = ctx.fail('invalid token')
        break
      case 'TokenExpiredError':
        ctx.body = ctx.fail('token expired')
        break
      default:
        ctx.body = ctx.fail(`internal server error: ${error.message}`)
        break
    }
  }
}

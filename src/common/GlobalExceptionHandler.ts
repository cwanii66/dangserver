import type { Context } from 'koa'
import type Koa from 'koa'
import Logger from '../common/Logger'

export async function globalExceptionHandler(ctx: Context, next: Koa.Next) {
  Logger.debug('enter common exception handler')
  try {
    await next()
  }
  catch (err: any) {
    if (err.status === 401)
      ctx.body = ctx.fail(`${err.status}: Unauthorized or expired token`)
    else
      ctx.body = ctx.fail(`500 Internal Server Error: ${err.message}`)
  }
}

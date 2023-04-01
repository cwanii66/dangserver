import type { Context } from 'koa'
import type Koa from 'koa'
import Logger from '../common/Logger'

export async function globalExceptionHandler(ctx: Context, next: Koa.Next) {
  Logger.error('enter common exception handler')
  try {
    await next()
  }
  catch (e: unknown) {
    const error = e as Error
    ctx.body = ctx.fail(`internal server error: ${error.message}`)
  }
}

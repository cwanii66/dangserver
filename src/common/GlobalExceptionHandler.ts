import type { Context } from 'koa'
import type Koa from 'koa'

export async function globalExceptionHandler(ctx: Context, next: Koa.Next) {
  // eslint-disable-next-line no-console
  console.log('enter common exception handler')
  try {
    await next()
  }
  catch (e: unknown) {
    const error = e as Error
    ctx.body = ctx.fail(`internal server error: ${error.message}`)
  }
}

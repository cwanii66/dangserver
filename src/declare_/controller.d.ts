import 'koa'
import type Router from 'koa-router'

declare module 'koa' {
  export interface ContextDelegatedRequest {
    rootRouter: Router
  }
}

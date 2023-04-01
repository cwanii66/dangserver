import path from 'node:path'
import fg from 'fast-glob'
import Router from 'koa-router'
import body from 'koa-body'
import json from 'koa-json'
import type Koa from 'koa'
import { globalExceptionHandler } from './GlobalExceptionHandler'
import * as responseHandler from './ResponseProcess'

// class for loading all router
class RouterLoaderWrapper {
  app!: Koa
  static instance: RouterLoaderWrapper = new RouterLoaderWrapper()

  // initialize router loader
  init(app: Koa) {
    this.app = app
    Object.assign(this.app.context, responseHandler)
    this.loadAllRouterWrapper()
    process.nextTick(() => this.listen())
  }

  // load absolute path of all router files
  getAbsoluteFilePaths() {
    const dir = path.resolve(process.cwd(), 'src/router')
    const routerFiles = fg.sync('*.ts', {
      cwd: dir,
      deep: 1,
      absolute: true,
    })
    return routerFiles
  }

  // router type predicate
  isRouter(pathData: unknown): pathData is Router {
    return pathData instanceof Router
  }

  // load all 2 level routes to 1 level routes
  loadAllRouterWrapper() {
    const allAbsoluteFilePaths = this.getAbsoluteFilePaths()
    const rootRouter = this.getRootRouter()
    this.loadAllRouter(allAbsoluteFilePaths, rootRouter)
    this.handleException()
    this.loadRootRouter(rootRouter)
  }

  // get 1 level(root) router
  getRootRouter() {
    const rootRouter = new Router()
    rootRouter.prefix('/dang')
    this.app.use(json())
    this.app.use(body())
    return rootRouter
  }

  // handle exception
  handleException() {
    this.app.use(globalExceptionHandler)
  }

  loadRootRouter(rootRouter: Router) {
    this.app.use(rootRouter.routes())
  }

  // load 2 level router
  async loadAllRouter(allAbsoluteFilePaths: string[], rootRouter: Router) {
    for (const routerPath of allAbsoluteFilePaths) {
      const router = (await import(routerPath)).default
      if (this.isRouter(router))
        rootRouter.use(router.routes(), router.allowedMethods())
    }
  }

  listen() {
    this.app.listen(3002)
    // eslint-disable-next-line no-console
    console.log('server is running at port 3002')
  }
}

export default RouterLoaderWrapper.instance

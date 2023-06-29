import path from 'node:path'
import fg from 'fast-glob'
import Router from 'koa-router'
import body from 'koa-body'
import json from 'koa-json'
import koajwt from 'koa-jwt'
import type Koa from 'koa'
import { globalExceptionHandler } from './GlobalExceptionHandler'
import * as responseHandler from './ResponseProcess'
import Logger from './Logger'

class AllCtrlRouterLoader {
  app!: Koa
  static instance: AllCtrlRouterLoader = new AllCtrlRouterLoader()

  // initialize router loader
  init(app: Koa) {
    this.app = app
    Object.assign(this.app.context, responseHandler)
    this.loadMiddlewares() // load all middlewares
    this.storeRootRouterToCtx() // store root router
    this.loadAllCtrlRouterWrapper() // load controller router
    process.nextTick(() => this.listen())
  }

  loadMiddlewares() {
    this.app.use(json())
    this.app.use(body())
    this.app.use(globalExceptionHandler)
    this.app.use(
      koajwt({ secret: 'cwanii' })
        .unless({
          path: [
            /^\/dang\/usermodule\/login/,
            /^\/dang\/ctgymodule/,
            /^\/dang\/commentmodule\/findCommentList/,
            /^\/dang\/replymodule\/addReply/,
            /^\/dang\/bookmodule\/findBooksByPager/,
            /^\/dang\/ordermodule\/submitorder/,
          ],
        }),
    )
  }

  storeRootRouterToCtx() {
    const rootRouter = new Router()
    rootRouter.prefix('/dang')
    this.app.context.rootRouter = rootRouter
    this.loadRootRouter(rootRouter)
  }

  // load absolute path of all router files
  getAbsoluteFilePaths() {
    const dir = path.resolve(process.cwd(), 'src/controller')
    const routerFiles = fg.sync('*Controller.ts', {
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

  loadRootRouter(rootRouter: Router) {
    this.app.use(rootRouter.routes())
  }

  // load 2 level router
  async loadAllRouter(allAbsoluteFilePaths: string[]) {
    for (const routerPath of allAbsoluteFilePaths)
      await import(routerPath)
  }

  loadAllCtrlRouterWrapper() {
    const filePaths = this.getAbsoluteFilePaths()
    this.loadAllRouter(filePaths)
  }

  listen() {
    this.app.listen(8005)
    Logger.info('server is running at port 8005...')
  }
}

export default AllCtrlRouterLoader.instance

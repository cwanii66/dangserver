import Koa from 'koa'
import allRouterLoader from './common/AllCtrlRouterLoader'

const app = new Koa()
allRouterLoader.init(app)

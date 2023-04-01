import Koa from 'koa'
import allRouterLoader from './common/allRouterLoader'

const app = new Koa()
allRouterLoader.init(app)

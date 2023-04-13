import type { Context } from 'koa'
import Router from 'koa-router'
import { success } from '../common/ResponseProcess'
import ctgyDao from '../modules/ctgy/dao/CtgyDao'
// import ctgyController from '../controller/CtgyController'

const router = new Router()

router.prefix('/ctgymodule')

router.get('/findSecThrdCtgys/:firstctgyid', async (ctx: Context) => {
  const { firstctgyid } = ctx.params
  const ret = await ctgyDao.findSecThrdCtgys(firstctgyid)

  ctx.body = success(ret)
})

export default router

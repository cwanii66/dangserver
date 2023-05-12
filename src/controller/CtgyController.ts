import type { Context } from 'koa'
import { controller, get } from '../decorator'
import ctgyDao from '../modules/ctgy/dao/CtgyDao'
import ctgyService from '../modules/ctgy/service/CtgyService'

@controller('/ctgymodule')
class CtgyController {
  @get('/findSecThrdCtgys/:firstctgyid')
  async findSecThrdCtgy(ctx: Context) {
    const { firstctgyid } = ctx.params
    const ret = await ctgyDao.findSecThrdCtgys(firstctgyid)
    ctx.body = ctx.success(ret)
  }

  @get('/findFirstCtgys')
  async findFirstCtgys(ctx: Context) {
    const data = ctx.success(await ctgyService.findFirstCtgys())
    ctx.body = data
  }
}

export default new CtgyController()

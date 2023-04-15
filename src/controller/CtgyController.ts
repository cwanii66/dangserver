import type { Context } from 'koa'
import { controller, get } from '../decorator'
import ctgyDao from '../modules/ctgy/dao/CtgyDao'

@controller('/ctgymodule')
class CtgyController {
  // static ctgyController: CtgyController = new CtgyController()

  @get('/findSecThrdCtgys/:firstctgyid')
  async findSecThrdCtgy(ctx: Context) {
    const { firstctgyid } = ctx.params
    const ret = await ctgyDao.findSecThrdCtgys(firstctgyid)
    ctx.body = ctx.success(ret)
  }
}

export default new CtgyController()

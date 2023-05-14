import type { Context } from 'koa'
import { controller, get } from '../decorator'
import shopCartService from '../modules/shopcart/service/ShopCartService'

@controller('/shopcartmodule')
class ShopCartController {
  @get('/findCurUsrShopCartList/:userid')
  async findSecThrdCtgy(ctx: Context) {
    const { userid } = ctx.params
    const shopCartList = await shopCartService.findCurUsrShopCartList(userid)
    ctx.body = ctx.success(shopCartList)
  }
}

export default new ShopCartController()

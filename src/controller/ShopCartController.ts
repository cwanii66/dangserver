import type { Context } from 'koa'
import { controller, get, post } from '../decorator'
import shopCartService from '../modules/shopcart/service/ShopCartService'

@controller('/shopcartmodule')
class ShopCartController {
  @get('/findCurUsrShopCartList/:userid')
  async findSecThrdCtgy(ctx: Context) {
    const { userid } = ctx.params
    const shopCartList = await shopCartService.findCurUsrShopCartList(userid)
    ctx.body = ctx.success(shopCartList)
  }

  @post('/addBookToShopCart')
  async addBookToShopCart(ctx: Context) {
    const shopCartRaw = ctx.request.body
    const dbShopCart = await shopCartService.addBookToShopCart(shopCartRaw)
    ctx.body = ctx.success(dbShopCart)
  }
}

export default new ShopCartController()

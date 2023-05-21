import type { Context } from 'koa'
import { controller, del, get, post, put } from '../decorator'
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

  @put('/updateShopCart')
  async updateShopCart(ctx: Context) {
    const shopCartRaw = ctx.request.body
    const dbShopCart = await shopCartService.updateShopCart(shopCartRaw)
    ctx.body = ctx.success(dbShopCart)
  }

  @del('/deleteShopCart/:shopCartId')
  async deleteShopCart(ctx: Context) {
    const { shopCartId } = ctx.params
    const delCount = await shopCartService.deleteShopCart(shopCartId)
    ctx.body = ctx.success(delCount)
  }
}

export default new ShopCartController()

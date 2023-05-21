import shopCartDao from '../dao/ShopCartDao'
import type { ShopCartRaw, ShopCartRawWithShopCartId } from '../raw'
import { combine } from '../../commonModuleFn'

class ShopCartService {
  static shopCartService: ShopCartService = new ShopCartService()

  async findCurUsrShopCartList(userid: number) {
    return await shopCartDao.findCurUsrShopCartList(userid)
  }

  async addBookToShopCart(shopCart: ShopCartRaw) {
    const ret = await shopCartDao.addBookToShopCart(shopCart) // [ primarKey, affectedRows]
    return combine({ shopcartid: ret[0] as number }, shopCart)
  }

  async updateShopCart(shopCart: ShopCartRawWithShopCartId) {
    await shopCartDao.updateShopCart(shopCart)
    return shopCart
  }

  async deleteShopCart(shopCartId: number) {
    return await shopCartDao.deleteShopCart(shopCartId)
  }
}

export default ShopCartService.shopCartService

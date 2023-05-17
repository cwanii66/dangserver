import shopCartDao from '../dao/ShopCartDao'
import type { ShopCartRaw } from '../raw'
import { combine } from '../../commonModuleFn'

class ShopCartService {
  static shopCartService: ShopCartService = new ShopCartService()

  async findCurUsrShopCartList(userid: number) {
    return await shopCartDao.findCurUsrShopCartList(userid)
  }

  async addBookToShopCart(shopCart: ShopCartRaw) {
    const ret = await shopCartDao.addBookToShopCart(shopCart) // [ primarKey, affectedRows]
    return combine({ shopcartid: ret[0] }, shopCart)
  }
}

export default ShopCartService.shopCartService

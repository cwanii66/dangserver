import shopCartDao from '../dao/ShopCartDao'

class ShopCartService {
  static shopCartService: ShopCartService = new ShopCartService()

  async findCurUsrShopCartList(userid: number) {
    return await shopCartDao.findCurUsrShopCartList(userid)
  }
}

export default ShopCartService.shopCartService

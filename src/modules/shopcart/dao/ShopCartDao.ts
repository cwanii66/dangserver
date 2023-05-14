import ShopCart from '../../decoratorModel/ShopCart'

class ShopCartDao {
  static shopCartDao: ShopCartDao = new ShopCartDao()

  async findCurUsrShopCartList(userid: number) {
    return await ShopCart.findAll({
      raw: true,
      where: {
        userid,
      },
    })
  }
}

export default ShopCartDao.shopCartDao

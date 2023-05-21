import { sequelize } from '../../BaseDao'
import ShopCart from '../../decoratorModel/ShopCart'
import type { ShopCartRaw, ShopCartRawWithShopCartId } from '../raw'

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

  async addBookToShopCart(shopCart: ShopCartRaw): Promise<[any, any]> {
    const sql = `insert into shopcart (bookisbn, bookname, userid, bookprice, purchasenum, bookpicname) 
      values ('${shopCart.bookisbn}', '${shopCart.bookname}', ${shopCart.userid}, ${shopCart.bookprice}, ${shopCart.purchasenum}, '${shopCart.bookpicname}')`
    return await sequelize.query(sql)
  }

  async updateShopCart(shopCart: ShopCartRawWithShopCartId): Promise<[any, any]> {
    const sql = `update shopcart set purchasenum = ${shopCart.purchasenum} where shopcartid = ${shopCart.shopcartid}`
    return await sequelize.query(sql)
  }

  async deleteShopCart(shopCartId: number) {
    return ShopCart.destroy({
      where: {
        shopcartid: shopCartId,
      },
    })
  }
}

export default ShopCartDao.shopCartDao

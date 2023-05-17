import { sequelize } from '../../BaseDao'
import ShopCart from '../../decoratorModel/ShopCart'
import type { ShopCartRaw } from '../raw'

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
}

export default ShopCartDao.shopCartDao

import { sequelize } from '../../BaseDao'
import type { OrderDetail, OrderInfo } from '../raw'

class OrderDao {
  static orderDao: OrderDao = new OrderDao()

  async addOrderInfo(orderInfo: OrderInfo): Promise<[any, any]> {
    const orderSql = `insert into orderinfo(ordertime, customerid, orderstatus)
      values('${orderInfo.ordertime}', ${orderInfo.customerid}, ${orderInfo.orderstatus})
    `
    return sequelize.query(orderSql)
  }

  async addOrderDetail(orderDetail: OrderDetail): Promise<[any, any]> {
    const orderDetailSql = `insert into orderdetail(orderid, bookname, bookpicname, bookprice, purchasenum)
      values(${orderDetail.orderid}, '${orderDetail.bookname}', '${orderDetail.bookpicname}', ${orderDetail.bookprice}, ${orderDetail.purchasenum})
    `
    return sequelize.query(orderDetailSql)
  }
}

export default OrderDao.orderDao

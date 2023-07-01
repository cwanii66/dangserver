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

  async findOrderByUserId(customerId: number): Promise<[any, any]> {
    const findByUserSql = `select 
      oi.orderid, oi.ordertime, oi.customerid, oi.orderstatus, 
      od.orderdetailid, od.bookname, od.bookprice, od.bookpicname, od.orderid, od.purchasenum 
        from orderinfo as oi inner join orderdetail as od
        on oi.orderid=od.orderid and customerid=${customerId}`
    return sequelize.query(findByUserSql)
  }
}

export default OrderDao.orderDao

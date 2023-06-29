import type { OrderInfo } from '../raw'
import orderDao from '../dao/OrderDao'
import { addRecordToArrItm } from '../../commonModuleFn'
import shopCartService from '../../shopcart/service/ShopCartService'

class OrderService {
  static orderService: OrderService = new OrderService()

  async submitOrder(order: OrderInfo) {
    const orderInfo: OrderInfo = {
      ordertime: order.ordertime,
      customerid: order.customerid,
      orderstatus: 1,
    }
    const [dbOrderId] = await orderDao.addOrderInfo(orderInfo)
    order.orderid = dbOrderId

    const orderDetails = order.orderDetailList!
    const finalOrderDetails = addRecordToArrItm(orderDetails, { orderid: dbOrderId })

    let dbOrderDetailId: number
    for (const orderDetail of finalOrderDetails) {
      dbOrderDetailId = (await orderDao.addOrderDetail(orderDetail))[0]
      orderDetail.orderdetailid = dbOrderDetailId
      await shopCartService.deleteShopCart(orderDetail.shopcartid!)
    }
    order.orderDetailList = finalOrderDetails
    return order // sync dbOrderId and dbOrderDetailId
  }
}

export default OrderService.orderService

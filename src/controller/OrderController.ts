import type { Context } from 'koa'
import type { OrderInfo } from '../modules/order/raw'
import { controller, get, post, put } from '../decorator'
import orderService from '../modules/order/service/OrderService'

@controller('/ordermodule')
class OrderController {
  @post('/submitorder')
  async submitOrder(ctx: Context) {
    const orderInfo: OrderInfo = ctx.request.body
    const orderDetails = await orderService.submitOrder(orderInfo)
    ctx.body = ctx.success(orderDetails)
  }

  @get('/findorderbyuserid/:userId')
  async findOrderByUserId(ctx: Context) {
    const { userId } = ctx.params
    const orderList = await orderService.findOrderByUserId(userId)
    ctx.body = ctx.success(orderList)
  }

  @put('/updateOrderStatusByOrderId')
  async updateOrderStatusByOrderId(ctx: Context) {
    const { orderId } = ctx.request.body
    const affectedRows = await orderService.updateOrderStatusByOrderId(orderId)
    ctx.body = ctx.success(affectedRows)
  }
}

export default new OrderController()

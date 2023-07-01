import type { Context } from 'koa'
import type { OrderInfo } from '../modules/order/raw'
import { controller, get, post } from '../decorator'
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
}

export default new OrderController()

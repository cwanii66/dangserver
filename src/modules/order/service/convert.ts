import { combine, getNoReptItm, getSubItemList } from '../../commonModuleFn'
import type { OrderDetail, OrderInfo, OrderInfoRaw } from '../raw'

type OrderDetailType = Pick<Required<OrderDetail>, 'orderdetailid' | 'bookname' | 'bookprice' | 'bookpicname' | 'purchasenum'>
type OrderInfoType = Omit<Required<OrderInfo>, 'orderDetailList'> & { orderDetailList: OrderDetailType[] }

function getOrderInfoList(orderListRaw: OrderInfoRaw[]) {
  return getSubItemList(orderListRaw, [
    'orderid',
    'ordertime',
    'customerid',
    'orderstatus',
  ])
}
function getOrderDetailList(orderListRaw: OrderInfoRaw[]) {
  return getSubItemList(orderListRaw, [
    'orderid',
    'orderdetailid',
    'bookname',
    'bookprice',
    'bookpicname',
    'purchasenum',
  ])
}

export function convert(orderListRaw: OrderInfoRaw[]) {
  const orderInfoListRaw = getOrderInfoList(orderListRaw)
  const orderDetailListRaw = getOrderDetailList(orderListRaw)

  const noReptOrderInfoRaw = getNoReptItm(orderInfoListRaw, 'orderid')

  const combinedOrderInfoList: OrderInfoType[]
    = noReptOrderInfoRaw.map((orderInfo) => {
      const currentOrderDetails = orderDetailListRaw.filter(orderDetail => orderDetail.orderid === orderInfo.orderid)
      return combine(orderInfo, { orderDetailList: currentOrderDetails })
    })

  return combinedOrderInfoList
}

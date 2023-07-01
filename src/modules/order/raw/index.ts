export interface OrderInfo {
  orderid?: number // optional, auto-incremented
  ordertime: string
  customerid: number
  orderstatus: number
  orderDetailList?: OrderDetail[]
}

export interface OrderDetail {
  orderdetailid?: number // optional, auto-incremented
  orderid?: number
  bookname: string
  bookpicname: string
  bookprice: number
  purchasenum: number
  shopcartid?: number // the field is received from front-end, making sure to submit an order detail to delete the corresponding book information in the shopping cart list
}

// db inner join query format
export interface OrderInfoRaw {
  orderid: number
  ordertime: string
  customerid: number
  orderstatus: number

  bookname: string
  bookpicname: string
  bookprice: number
  purchasenum: number
  orderdetailid: number
}

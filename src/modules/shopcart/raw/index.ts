import type ShopCart from '../../decoratorModel/ShopCart'
export type ShopCartRaw = Pick<ShopCart, 'bookisbn' | 'bookname' | 'userid' | 'bookprice' | 'purchasenum' | 'bookpicname'>
export type ShopCartRawWithShopCartId = ShopCartRaw & Pick<ShopCart, 'shopcartid'>

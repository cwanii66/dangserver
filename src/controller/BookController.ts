import type { Context } from 'koa'
import { controller, get } from '../decorator'
import bookDao from '../modules/book/dao/BookDao'

@controller('/bookmodule')
class BookController {
  @get('/findbooksbylike/:liker')
  async findBooksByLike(ctx: Context) {
    const { liker } = ctx.params
    const ret = await bookDao.findBooksByLike(liker)
    ctx.body = ctx.success(ret)
  }

  @get('/findBooksByThirdctgyId/:thirdctgyId')
  async findBooksByThirdctgyId(ctx: Context) {
    const { thirdctgyId } = ctx.params
    const ret = await bookDao.findBooksByThirdctgyId(+thirdctgyId)
    ctx.body = ctx.success(ret)
  }

  @get('/findBooksByPager/:offset/:pageSize')
  async findBooksByPager(ctx: Context) {
    const { offset, pageSize } = ctx.params
    const ret = await bookDao.findBooksByPager(+offset, +pageSize)
    ctx.body = ctx.success(ret)
  }
}

export default new BookController()

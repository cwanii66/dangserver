import type { Context } from 'koa'
import { controller, get, post } from '../decorator'
import bookDao from '../modules/book/dao/BookDao'

@controller('/bookmodule')
class BookController {
  @get('/findbooksbylike/:liker')
  async findBooksByLike(ctx: Context) {
    const { liker } = ctx.params
    const ret = await bookDao.findBooksByLike(liker)
    ctx.body = ctx.success(ret)
  }

  @get('/findBooksByThirdctgyId/:thirdctgyId/:sortField/:sortType')
  async findBooksByThirdctgyId(ctx: Context) {
    const { thirdctgyId, sortField, sortType } = ctx.params
    const ret = await bookDao.findBooksByThirdctgyId(+thirdctgyId, sortField, sortType)
    ctx.body = ctx.success(ret)
  }

  @get('/findAllBooksBySecondCtgyId/:secondCtgyId')
  async findAllBooksBySecondCtgyId(ctx: Context) {
    const { secondCtgyId } = ctx.params
    const ret = await bookDao.findAllBooksBySecondCtgyId(+secondCtgyId)
    ctx.body = ctx.success(ret)
  }

  @get('/findBooksByPager/:offset/:pageSize')
  async findBooksByPager(ctx: Context) {
    const { offset, pageSize } = ctx.params
    const ret = await bookDao.findBooksByPager(+offset, +pageSize)
    ctx.body = ctx.success(ret)
  }

  @get('/findBooksByAutoCompKeyword/:autoCompKeyword')
  async findBooksByAutoCompKeyword(ctx: Context) {
    const { autoCompKeyword } = ctx.params
    const ret = await bookDao.findBooksByAutoCompKeyword(autoCompKeyword)
    ctx.body = ctx.success(ret)
  }

  @get('/findPublishersByAutoCompKeyword/:autoCompKeyword')
  async findPublishersByAutoCompKeyword(ctx: Context) {
    const { autoCompKeyword } = ctx.params
    const publishers = await bookDao.findPublishersByAutoCompKeyword(autoCompKeyword)
    ctx.body = ctx.success(publishers)
  }

  @post('/findBooksByPublisherIds')
  async findBooksByPublisherIds(ctx: Context) {
    const publisherIds: number[] = ctx.request.body
    const books = await bookDao.findBooksByPublisherIds(publisherIds)
    ctx.body = ctx.success(books)
  }

  @get('/findBooksByISBN/:isbn')
  async findBooksByISBN(ctx: Context) {
    const { isbn } = ctx.params
    const book = await bookDao.findBooksByISBN(isbn)
    ctx.body = ctx.success(book)
  }
}

export default new BookController()

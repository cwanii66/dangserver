import type { Context } from 'koa'
import Router from 'koa-router'

// type of userinfo
interface BookInfo {
  bookname: string
}

const router = new Router()

router.prefix('/bookmodule')

router.get('/findbookinfo/:bookname', async (ctx: Context) => {
  const { bookname } = ctx.params
  ctx.body = `find book info by bookname: ${bookname}`
})

// post request -> add user
router.post('/adduser', async (ctx: Context) => {
  const { bookname }: BookInfo = ctx.request.body
  ctx.body = `add book: ${bookname}`
})

export default router

import type { Context } from 'koa'
import { controller, get } from '../decorator'
import commentDao from '../modules/comment/CommentDao'

@controller('/commentmodule')
export class CommentController {
  @get('/findCommentList/:isbn')
  async getCommentList(ctx: Context) {
    const { isbn } = ctx.params
    const commentsWithReplyList = await commentDao.findCommentsByISBN(isbn)
    ctx.body = ctx.success(commentsWithReplyList)
  }
}

import type { Context } from 'koa'
import { controller, post } from '../decorator'
import replyService from '../modules/reply/service/ReplyService'

@controller('/replymodule')
export class ReplyController {
  @post('/addreply')
  async getCommentList(ctx: Context) {
    const reply = ctx.request.body
    const finalReply = await replyService.addReply(reply)
    ctx.body = ctx.success(finalReply)
  }
}

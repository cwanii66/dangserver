import replyDao from '../ReplyDao'
import type Reply from '../../decoratorModel/Reply'
import { combine } from '../../commonModuleFn'

type ReplyRawKeys = 'replyid' | 'evalid' | 'replycontent' | 'replier' | 'strReplyDate'
type ReplyRaw = Pick<Reply, ReplyRawKeys>

class ReplyService {
  static replyService: ReplyService = new ReplyService()

  async addReply(reply: ReplyRaw) {
    const [addedKey] = await replyDao.addReply(reply)
    const finalReply = combine({ replyid: addedKey }, reply)
    return finalReply
  }
}

export default ReplyService.replyService

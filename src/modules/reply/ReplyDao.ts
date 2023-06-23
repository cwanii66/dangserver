import { sequelize } from '../BaseDao'
import type Reply from '../decoratorModel/Reply'

type ReplyRawKeys = 'replyid' | 'evalid' | 'replycontent' | 'replier' | 'strReplyDate'
type ReplyRaw = Pick<Reply, ReplyRawKeys>

class ReplyDao {
  static replyDao: ReplyDao = new ReplyDao()

  async addReply(reply: ReplyRaw): Promise<[any, any]> {
    const sql = `insert into reply (replycontent, replydate, evalid, replier) values ('${reply.replycontent}', '${reply.strReplyDate}', '${reply.evalid}', '${reply.replier}')`
    return sequelize.query(sql)
  }
}

export default ReplyDao.replyDao

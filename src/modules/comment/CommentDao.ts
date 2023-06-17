import { Op } from 'sequelize'
import Comment from '../decoratorModel/Comment'
import Reply from '../decoratorModel/Reply'
import { sequelize } from '../../modules/BaseDao'
import { convert } from './convert'

class CommentDao {
  static commentDao: CommentDao = new CommentDao()

  async findCommentsByISBN(isbn: string) {
    const sql = `
      select * from comment as c 
        left join dangdang.reply as r 
        on c.commentid=r.evalid 
        where c.isbn='${isbn}'
      `
    const commentsWithReplyRaw: any[] = (await sequelize.query(sql))[0]
    return convert(commentsWithReplyRaw) // the transformation needs to conform to the structure of the outer join query
  }
}

export default CommentDao.commentDao

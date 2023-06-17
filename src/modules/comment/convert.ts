import type Comment from '../decoratorModel/Comment'
import type Reply from '../decoratorModel/Reply'
import { combine, getNoReptItm, getSubItemList } from '../../modules/commonModuleFn'

function getCommentList(comments: Comment[]) {
  return getSubItemList(comments, [
    'commentid',
    'content',
    'commentuser',
    'isbn',
    'avatar',
    'likes',
    'evaluatelevel',
    'pubdate',
    'isanonymous',
  ])
}

function getReplyList(comments: Comment[]) {
  return getSubItemList(comments, [
    'replyid',
    'replycontent',
    'replydate',
    'replier',
    'evalid',
  ])
}

type CommentKeysUnion = 'commentid' | 'content' | 'commentuser' | 'isbn' | 'avatar' | 'likes' | 'evaluatelevel' | 'pubdate' | 'isanonymous'
type CommentReplyListUnion = CommentKeysUnion | 'replyList'
type CommentReplyItem = Pick<Comment, CommentReplyListUnion>
type CommentReplyList = CommentReplyItem[] // expected type
type ReplyItem = Pick<Reply, 'replyid' | 'replycontent' | 'replydate' | 'replier' | 'evalid'>
type ReplyList = ReplyItem[]

export function convert(commentReplyList: Comment[]) {
  const commentList = getCommentList(commentReplyList)
  const noReptCommentList = getNoReptItm(commentList, 'commentid')
  const replyList = getReplyList(commentReplyList)

  const commentsWithReplyList: CommentReplyList
    = noReptCommentList.map(
      (comment) => {
        const replies: ReplyList = replyList.filter(reply => reply.evalid === comment.commentid)
        return combine(comment, { replyList: replies })
      },
    )

  return commentsWithReplyList
}

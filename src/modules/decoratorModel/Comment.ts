import { Column, Model, Table } from 'sequelize-typescript'
import type Reply from './Reply'

@Table({
  tableName: 'comment',
})
export default class Comment extends Model<Comment> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  commentid!: number

  @Column
  content!: string

  @Column
  commentuser!: string // 发表人

  @Column
  isbn!: string

  @Column
  avatar!: string

  @Column
  likes!: string // 点赞数

  @Column
  evaluatelevel!: string // 评价等级

  @Column
  pubdate!: Date // 发表时间

  @Column
  isanonymous!: string // 是否匿名

  // One comment could have many replies
  replyid!: number
  replycontent!: string
  replydate!: Date
  replier!: string
  evalid!: number
  replyList: Pick<Reply, 'replyid' | 'replycontent' | 'replydate' | 'replier' | 'evalid'>[] = []
}

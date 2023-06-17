import { Column, Model, Table } from 'sequelize-typescript'

@Table({
  tableName: 'reply',
})
export default class Reply extends Model<Reply> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  replyid!: number

  @Column
  replycontent!: string

  @Column
  replydate!: Date

  strReplyDate!: string

  @Column
  evalid!: number

  @Column
  replier!: string
}

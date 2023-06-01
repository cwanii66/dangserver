import { Column, Model, Table } from 'sequelize-typescript'
import { DataTypes } from 'sequelize'

@Table({
  tableName: 'historykeyword',
})
export default class HistoryKeyWord extends Model<HistoryKeyWord> {
  @Column({
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  })
  hkwid!: number

  @Column({
    type: DataTypes.STRING,
    allowNull: false,
  })
  historykeyword!: string

  @Column({
    type: DataTypes.INTEGER,
    allowNull: true,
  })
  clickcount!: number
}

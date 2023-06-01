import { Column, Model, Table } from 'sequelize-typescript'
import { DataTypes } from 'sequelize'

@Table({
  tableName: 'keyword',
})
export default class Keyword extends Model<Keyword> {
  @Column({
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  })
  kwid!: number

  @Column({
    type: DataTypes.STRING,
    allowNull: false,
  })
  keyword!: string
}

import { Column, Model, Table } from 'sequelize-typescript'
import { DataTypes } from 'sequelize'

@Table({
  tableName: 'shopcart',
})
export default class ShopCart extends Model<ShopCart> {
  @Column({
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  })
  shopcartid!: number

  @Column({
    type: DataTypes.STRING,
    allowNull: false,
  })
  bookisbn!: string

  @Column({
    type: DataTypes.STRING,
    allowNull: false,
  })
  bookname!: string

  @Column({
    type: DataTypes.STRING,
    allowNull: false,
  })
  bookpicname!: string

  @Column({
    type: DataTypes.INTEGER,
    allowNull: false,
  })
  bookprice!: number

  @Column({
    type: DataTypes.INTEGER,
    allowNull: false,
  })
  userid!: number

  @Column({
    type: DataTypes.INTEGER,
    allowNull: false,
  })
  purchasenum!: number
}

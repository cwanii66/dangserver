// this file is for test only with decorator model

import { Column, Model, Table } from 'sequelize-typescript'
import { DataTypes } from 'sequelize'

@Table({
  tableName: 'userinfo',
})
export default class Userinfo extends Model<Userinfo> {
  @Column({
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  })
  userid!: number

  @Column({
    type: DataTypes.STRING,
    allowNull: false,
  })
  username!: string

  @Column({
    type: DataTypes.STRING(30),
    allowNull: false,
  })
  password!: string

  @Column({
    type: DataTypes.STRING,
    allowNull: false,
  })
  address!: string

  @Column({
    type: DataTypes.INTEGER,
    allowNull: false,
  })
  valid!: number

  @Column({
    type: DataTypes.INTEGER,
    allowNull: false,
  })
  age!: number
}

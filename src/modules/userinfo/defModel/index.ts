import { DataTypes } from 'sequelize'
import { sequelize } from '../../BaseDao'

class UserInfo {
  static createModel() {
    const userModel = sequelize.define('userinfo', {
      userid: {
        type: DataTypes.INTEGER,
        field: 'userid',
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: DataTypes.STRING(30),
        field: 'username',
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(20),
        field: 'password',
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING(50),
        field: 'address',
        allowNull: true,
      },
      valid: {
        type: DataTypes.INTEGER,
        field: 'valid',
        allowNull: true,
      },
      age: {
        type: DataTypes.INTEGER,
        field: 'age',
        allowNull: true,
      },
    }, {
      timestamps: false, // true by default, set false to disable createdAt and updatedAt
      freezeTableName: true, // true by default, set false to disable tableName to be the same as model name
    })
    userModel.sync({ force: false }) // use force: false to create table only if it doesn't exist
    return userModel
  }
}

export const userModel = UserInfo.createModel()

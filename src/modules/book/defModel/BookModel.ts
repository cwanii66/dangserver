import { DataTypes } from 'sequelize'
import { sequelize } from '../../BaseDao'

// create book model
class BookModel {
  static createModel() {
    const booksModel = sequelize.define(
      'books',
      {
        ISBN: {
          type: DataTypes.STRING,
          field: 'ISBN',
          primaryKey: true,
        },
        bookname: {
          type: DataTypes.STRING(20),
          field: 'bookname',
          allowNull: true,
        },
        author: {
          type: DataTypes.STRING(20),
          field: 'author',
          allowNull: false,
        },
        publishid: {
          type: DataTypes.INTEGER,
          field: 'publishid',
          allowNull: true,
        },
        publishername: {
          type: DataTypes.STRING(20),
          field: 'publishername',
          allowNull: true,
        },
        monthsalecount: {
          type: DataTypes.INTEGER,
          field: 'monthsalecount',
          allowNull: true,
        },
        bookpicname: {
          type: DataTypes.STRING(20),
          field: 'bookpicname',
          allowNull: true,
        },
        secondctgyId: {
          type: DataTypes.INTEGER,
          field: 'secondctgyId',
          allowNull: true,
        },
        thirdctgyId: {
          type: DataTypes.INTEGER,
          field: 'thirdctgyId',
          allowNull: true,
        },
        originalprice: {
          type: DataTypes.DECIMAL(10, 2),
          field: 'originalprice',
          allowNull: true,
        },
        discount: {
          type: DataTypes.DECIMAL(10, 2),
          field: 'discount',
          allowNull: true,
        },
      },
    )
    return booksModel
  }
}

export const booksModel = BookModel.createModel()

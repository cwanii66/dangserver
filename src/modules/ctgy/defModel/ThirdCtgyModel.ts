import { DataTypes } from 'sequelize'
import { sequelize } from '../../BaseDao'
class ThirdCtgyModel {
  static createModel() {
    const model = sequelize.define(
      'thirdctgy',
      {
        thirdctgyId: {
          type: DataTypes.INTEGER,
          field: 'thirdctgyId',
          primaryKey: true,
          autoIncrement: true,
        },
        thirdname: {
          type: DataTypes.STRING(20),
          field: 'thirdname',
          allowNull: false,
        },
        secondctgyId: {
          type: DataTypes.INTEGER,
          field: 'secondctgyId',
          allowNull: false,
        },
      },
      {
        freezeTableName: true, // true表示使用给定的表名，false表示模型名后加s作为表名
        timestamps: false, // true表示给模型加上时间戳属性(createAt、updateAt),false表示不带时间戳属性
      },
    )
    // model.sync({force:false})
    return model
  }
}
export const thirdCtgyModel = ThirdCtgyModel.createModel()

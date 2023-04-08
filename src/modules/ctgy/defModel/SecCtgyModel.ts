import { DataTypes } from 'sequelize'
import { sequelize } from '../../BaseDao'
class SecondCtgyModel {
  static createModel() {
    const model = sequelize.define(
      'secondctgy',
      {
        secondctgyId: {
          type: DataTypes.INTEGER,
          field: 'secondctgyId',
          primaryKey: true,
          autoIncrement: true,
        },
        secondgyname: {
          type: DataTypes.STRING(20),
          field: 'secondgyname',
          allowNull: false,
        },
        firstctgyId: {
          type: DataTypes.INTEGER,
          field: 'firstctgyId',
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
export const secondCtgyModel = SecondCtgyModel.createModel()

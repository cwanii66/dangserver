import { resolve } from 'node:path'
import type { Dialect } from 'sequelize'
import { Sequelize } from 'sequelize-typescript'
import dbConfig from '../config/DbConfig'

class BaseDao {
  static baseDao: BaseDao = new BaseDao()
  sequelize!: Sequelize

  constructor() {
    this.initSeqConf('mysql')
  }

  initSeqConf(dialect: Dialect) {
    // create sequelize instance
    const { host, user, password, database, port } = dbConfig.getDbConfig()
    this.sequelize = new Sequelize(database, user, password, {
      host,
      port,
      dialect,
      define: {
        timestamps: false,
        freezeTableName: false,
      },
    })
  }

  addModels() {
    const modelPath = resolve(__dirname, '../decoratorModel')
    this.sequelize.addModels([modelPath])
  }
}

const baseDao = BaseDao.baseDao
baseDao.addModels()
export const { sequelize } = baseDao

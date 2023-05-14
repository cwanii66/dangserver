import { resolve } from 'node:path'
import fg from 'fast-glob'
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
      pool: {
        max: 10,
        min: 2,
        idle: 10000,
        acquire: 3000,
      },
    })
  }

  addModels() {
    const _pattern = resolve(__dirname, './decoratorModel/*.ts')
    const modelPaths = fg.sync(_pattern)
    this.sequelize.addModels(modelPaths)
  }
}

const baseDao = BaseDao.baseDao
baseDao.addModels()
export const { sequelize } = baseDao

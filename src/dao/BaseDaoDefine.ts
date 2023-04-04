import type { Dialect } from 'sequelize'
import { Sequelize } from 'sequelize-typescript'
import dbConfig from '../config/DbConfig'

class BaseDaoDefine {
  static baseDaoOrm: BaseDaoDefine = new BaseDaoDefine()
  sequelize!: Sequelize

  constructor() {
    this.initSeqConf('mysql')
  }

  initSeqConf(dialect: Dialect) {
    const { host, port, user, password, database } = dbConfig.getDbConfig()
    this.sequelize = new Sequelize(database, user, password, {
      host,
      port,
      dialect,
      define: {
        timestamps: false,
        freezeTableName: true,
      },
    })
  }
}

export const { sequelize } = BaseDaoDefine.baseDaoOrm

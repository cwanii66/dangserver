import { resolve } from 'node:path'
import type { Dialect } from 'sequelize'
import { Sequelize } from 'sequelize-typescript'
import dbConfig from '@/config/DbConfig'

class BaseDaoOrm {
  static baseDaoOrm: BaseDaoOrm = new BaseDaoOrm()
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
    this.addModels()
  }

  addModels() {
    const modelPath = resolve(process.cwd(), 'src/ormModel')
    this.sequelize.addModels([modelPath])
  }
}

export default BaseDaoOrm.baseDaoOrm

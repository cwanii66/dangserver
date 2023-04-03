import type { Connection } from 'mysql'
import mysql from 'mysql'
import DbConfig from '../config/DbConfig'

class BaseDao {
  static baseDao: BaseDao = new BaseDao()
  private connection!: Connection

  constructor() {
    this.connect()
  }

  async connect() {
    this.connection = mysql.createConnection(DbConfig.getDbConfig())
  }

  async query<T>(sql: string) {
    return new Promise<T>((resolve, reject) => {
      this.connection.query(sql, (err, result) => {
        if (err)
          reject(err)
        resolve(result)
      })
    })
  }
}

export default BaseDao.baseDao

import { sequelize } from '../../BaseDao'

class CtgyDao {
  static ctgyDao: CtgyDao = new CtgyDao()

  async findSecThrdCtgys(firstctgyId: number) {
    const sql = `select * from secondctgy sc inner join thirdctgy tc on sc.secondctgyId = tc.secondctgyId where firstctgyId = ${firstctgyId}`
    const ret = await sequelize.query(sql, { type: 'SELECT' })
    return ret
  }
}

export default CtgyDao.ctgyDao

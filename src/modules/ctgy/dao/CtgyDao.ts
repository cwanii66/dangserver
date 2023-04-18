import { sequelize } from '../../BaseDao'
import { convert } from '../ctgyUtils'

class CtgyDao {
  static ctgyDao: CtgyDao = new CtgyDao()

  async findSecThrdCtgys(firstctgyId: number) {
    const sql = `select * from secondctgy sc inner join thirdctgy tc on sc.secondctgyId = tc.secctgyid where firstctgyId = ${firstctgyId}`
    const ret: any[] = (await sequelize.query(sql))[0]
    return convert(ret)
  }

  async findFirstCtgys() {
    const sql = 'select * from firstctgy'
    const ret: any[] = (await sequelize.query(sql))[0]
    return convert(ret)
  }
}

export default CtgyDao.ctgyDao

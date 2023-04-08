import { findSecondCtgyByFirstCtgyId } from '../defModel/OneToMany'

class CtgyDao {
  static ctgyDao: CtgyDao = new CtgyDao()

  async findSecThrdCtgys(firstctgyId: string) {
    return findSecondCtgyByFirstCtgyId(+firstctgyId)
  }
}

export default CtgyDao.ctgyDao

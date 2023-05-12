import ctgyDao from '../dao/CtgyDao'
import redisUtil from '../../../common/RedisUtil'

class CtgyService {
  static ctgyService: CtgyService = new CtgyService()
  async findFirstCtgys() {
    const rdbFirstCtgys = await redisUtil.hget('firstCtgyHash', 'firstCtgys')
    if (!rdbFirstCtgys) {
      const firstCtgys = await ctgyDao.findFirstCtgys()
      redisUtil.hset('firstCtgyHash', 'firstCtgys', firstCtgys)
      return firstCtgys
    }
    else {
      return rdbFirstCtgys
    }
  }
}

export default CtgyService.ctgyService

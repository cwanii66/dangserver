import ctgyDao from '../dao/CtgyDao'
import redisConfig from '../../../config/RedisConfig'

class CtgyService {
  static ctgyService: CtgyService = new CtgyService()
  async findFirstCtgys() {
    const redisClient = redisConfig.createRdbCli()
    const rdbFirstCtgys = await redisClient.hget('firstCtgyHash', 'firstCtgys')
    if (!rdbFirstCtgys) {
      const firstCtgys = await ctgyDao.findFirstCtgys()
      redisClient.hset('firstCtgyHash', 'firstCtgys', JSON.stringify(firstCtgys))
      return firstCtgys
    }
    else {
      return JSON.parse(rdbFirstCtgys)
    }
  }
}

export default CtgyService.ctgyService

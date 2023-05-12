import type { RedisClient } from '../config/RedisConfig'
import redisConfig from '../config/RedisConfig'

class RedisUtil implements RedisClient {
  static redisUtil: RedisUtil = new RedisUtil()
  static redisClient: RedisClient = redisConfig.createRdbCli()

  async hget(obj: string, field: string): Promise<any> {
    const value = await RedisUtil.redisClient.hget(obj, field)
    return value ? JSON.parse(value) : null
  }

  async hset(obj: string, field: string, value: any): Promise<any> {
    return await RedisUtil.redisClient.hset(obj, field, JSON.stringify(value))
  }

  async hgetall(obj: string): Promise<any> {
    return await RedisUtil.redisClient.hgetall(obj)
  }

  async hmset(obj: string, ...args: any[]): Promise<any> {
    return await RedisUtil.redisClient.hmset(obj, ...args)
  }

  async hmget(obj: string, ...args: any[]): Promise<any> {
    return await RedisUtil.redisClient.hmget(obj, ...args)
  }

  async set(key: string, value: string): Promise<string> {
    return await RedisUtil.redisClient.set(key, value)
  }

  async get(key: string): Promise<string> {
    return await RedisUtil.redisClient.get(key)
  }
}

export default RedisUtil.redisUtil

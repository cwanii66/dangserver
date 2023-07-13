import redis from 'koa-redis'

interface RDbConfig {
  host: string
  port: number
  password?: string
}

interface EnvConfig {
  dev: RDbConfig
  prod: RDbConfig
}
type RDbEnv = keyof EnvConfig

export interface RedisClient {
  set(key: string, value: string): Promise<string>
  get(key: string): Promise<string>
  hset(obj: string, field: string, value: string): Promise<any>
  hget(obj: string, field: string): Promise<any>
  hgetall(obj: string): Promise<any>
  hmset(obj: string, ...args: string[]): Promise<any>
  hmget(obj: string, ...args: any[]): Promise<any>
}

class RedisConfig {
  static redisConfig: RedisConfig = new RedisConfig()
  envConfig!: EnvConfig
  curEnv!: RDbEnv

  constructor() {
    this.curEnv = process.env.NODE_ENV === 'dev' ? 'dev' : 'prod'
    this.initConfig()
  }

  initConfig() {
    this.envConfig = {
      dev: {
        host: '127.0.0.1',
        port: 6379,
      },
      prod: {
        host: '8.130.89.209',
        port: 6379,
        password: 'cwanii66',
      },
    }
  }

  getRedisConfig() {
    return this.envConfig[this.curEnv]
  }

  createRdbCli() {
    const { host, port } = this.getRedisConfig()
    const redisClient: RedisClient = redis({ host, port }).client
    return redisClient
  }
}

export default RedisConfig.redisConfig

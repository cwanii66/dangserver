function isString(value: any): value is string {
  return typeof value === 'string'
}

interface DbConfig {
  host: string
  port: number
  user: string
  password: string
  database: string
}
interface EnvConfig {
  dev: DbConfig
  prod: DbConfig
}

class Config {
  static config: Config = new Config()
  env!: keyof EnvConfig
  envConfig!: EnvConfig

  constructor() {
    // ensure the process.env.NODE_ENV is a union type of 'dev' | 'prod'
    this.env = process.env.NODE_ENV as keyof EnvConfig | 'prod'
    this.initConfig()
  }

  initConfig() {
    this.envConfig = {
      dev: {
        host: 'localhost',
        user: 'admin',
        password: '123',
        database: 'dangdang',
        port: 3306,
      },
      prod: {
        host: 'www.xxx.com',
        user: 'root',
        password: '123',
        database: 'dangdang',
        port: 3306,
      },
    }
  }

  getDbConfig(): DbConfig
  getDbConfig(key: string): string
  getDbConfig(key?: string): DbConfig | string | number | boolean {
    if (this.isDbConfigKeys(key) && key.length > 0)
      return this.envConfig[this.env][key]
    else
      return this.envConfig[this.env]
  }

  // judge the key is DbConfig keys
  isDbConfigKeys(key: any): key is keyof DbConfig {
    return key in this.envConfig[this.env]
  }
}

export default Config.config

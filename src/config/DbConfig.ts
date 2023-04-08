function isString(value: any): value is string {
  return typeof value === 'string'
}

interface DbConfig {
  host: string
  port: number
  user: string
  password: string
  database: string
  [key: string]: unknown
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
    this.env = process.env.NODE_ENV as keyof EnvConfig ?? 'prod'
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
  getDbConfig(key: keyof DbConfig): string | number
  getDbConfig(key?: any): any {
    if (key && this.isDbConfigKeys(key))
      return this.envConfig[this.env][key]
    else
      return this.envConfig[this.env]
  }

  // change db config outside
  setDbConfig(data: DbConfig): void
  setDbConfig<K extends keyof DbConfig>(key: K, value: any): void
  setDbConfig(data: any, value?: any): void {
    if (typeof data === 'object') {
      this.envConfig[this.env] = { ...this.envConfig[this.env], ...data }
    }
    else if (!this.isDbConfigKeys(data)) {
      throw new Error('added key is incompatible with DbConfig')
    }
    else if (data && this.isDbConfigKeys(data)) {
      // update DbConfig properties
      this.envConfig[this.env][data] = value
    }
  }

  // judge whether the key is DbConfig keys
  isDbConfigKeys(key: any): key is keyof DbConfig {
    return Object.hasOwn(this.envConfig[this.env], key)
  }
}

export default Config.config

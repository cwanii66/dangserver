import log4js from 'log4js'

enum LogLevel {
  INFO = 'info',
  ERROR = 'error',
  DEBUG = 'debug',
  WARN = 'warn',
}

class Logger {
  static logger: Logger = new Logger()
  loggerInstance!: log4js.Logger

  constructor() {
    this.configure()
  }

  private configure(): void {
    log4js.configure({
      appenders: {
        console: {
          type: 'console',
          layout: {
            type: 'pattern',
            pattern: '%[[%p] %c%] \x1B[0m %m',
          },
        },
      },
      categories: {
        default: {
          appenders: ['console'],
          level: LogLevel.DEBUG,
        },
        info: {
          appenders: ['console'],
          level: LogLevel.INFO,
        },
        error: {
          appenders: ['console'],
          level: LogLevel.ERROR,
        },
        warn: {
          appenders: ['console'],
          level: LogLevel.WARN,
        },
      },
    })
  }

  getCategores(level: LogLevel) {
    /**
     * trace < debug < info < warn < error < fatal
     * watch out for the order of the log level
     */
    this.loggerInstance = log4js.getLogger(level)
  }

  debug(input: string): void {
    this.getCategores(LogLevel.DEBUG)
    this.loggerInstance.debug(input)
  }

  info(input: string): void {
    this.getCategores(LogLevel.INFO)
    this.loggerInstance.info(input)
  }

  error(input: string): void {
    this.getCategores(LogLevel.ERROR)
    this.loggerInstance.error(input)
  }

  warn(input: string): void {
    this.getCategores(LogLevel.WARN)
    this.loggerInstance.warn(input)
  }
}

export default Logger.logger

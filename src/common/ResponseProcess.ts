enum Code {
  SUCCESS = 200,
  SERVERERROR = 500,
}

class ResponseProcessor {
  static success(data?: any, msg: any = '') {
    const code: Code = Code.SUCCESS
    return {
      code,
      data,
      msg,
    }
  }

  static fail(msg: any = '') {
    const code: Code = Code.SERVERERROR
    return {
      code,
      msg,
    }
  }
}

export const { success, fail } = ResponseProcessor

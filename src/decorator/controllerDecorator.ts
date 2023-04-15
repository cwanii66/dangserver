import allCtrlRouterLoader from '../common/AllCtrlRouterLoader'

type MethodType = 'get' | 'post' | 'put' | 'delete'
interface Constructor { new (...args: any[]): any }

export function controller(modulePath = '/') {
  function getFullPath(reqPath: string) {
    const modulePathRegex = /^\/?[a-zA-Z]{1,15}$/
    if (modulePathRegex.test(modulePath)) {
      if (!modulePath.startsWith('/'))
        modulePath = `/${modulePath}`
      else if (modulePath === '/')
        modulePath = ''
    }
    else {
      console.error('path error: illegel path...')
    }
    return modulePath.concat(reqPath)
  }

  return function (targetClass: Constructor) {
    // 1. 获取原型上的请求方法名
    Object.getOwnPropertyNames(targetClass.prototype)
      .filter(methodName => methodName !== 'constructor' && typeof targetClass.prototype[methodName] === 'function')
      .forEach((methodName) => {
        // 2. 根据方法名获取具体的方法体
        const routerHandler = targetClass.prototype[methodName]
        // 3. 获取请求路径和请求类型，根路由对象
        const reqPath = Reflect.getMetadata('path', targetClass.prototype, methodName)
        const fullPath = getFullPath(reqPath)
        const reqMethodType: MethodType = Reflect.getMetadata('methodType', targetClass.prototype, methodName)
        // 4. 实现路由请求
        const rootRouter = allCtrlRouterLoader.app.context.rootRouter

        if (fullPath && reqMethodType)
          rootRouter[reqMethodType](fullPath, routerHandler)
      })
  }
}

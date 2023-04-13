import 'reflect-metadata'

function reqMethodFactory(methodType: string) {
  return function (reqPath: string) {
    return function (targetConstructor: Object, methodName: string | symbol, methodDescription: PropertyDescriptor) {
      Reflect.defineMetadata('path', reqPath, targetConstructor, methodName)
      Reflect.defineMetadata('methodType', methodType, targetConstructor, methodName)
    }
  }
}

const get = reqMethodFactory('get')
const post = reqMethodFactory('post')
const put = reqMethodFactory('put')
const del = reqMethodFactory('delete')

export { get, post, put, del }

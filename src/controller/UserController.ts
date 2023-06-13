import type { Context } from 'koa'
import { controller, post } from '../decorator'
import userService from '../modules/userinfo/service/UserService'

@controller('/usermodule')
class UserController {
  @post('/login')
  async login(ctx: Context) {
    const { username, password } = ctx.request.body
    const userInfo = await userService.login(username, password)
    if (userInfo)
      ctx.body = ctx.success(userInfo)
    else
      ctx.body = ctx.fail('用户名或密码错误')
  }
}

export default new UserController()

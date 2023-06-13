import type { Context } from 'koa'
import { controller, post } from '../decorator'
import userService from '../modules/userinfo/service/UserService'

@controller('/usermodule')
class UserController {
  @post('/login')
  async login(ctx: Context) {
    const { username, password } = ctx.request.body
    const userInfo = await userService.login(username, password)
    ctx.body = ctx.success(userInfo)
  }
}

export default new UserController()

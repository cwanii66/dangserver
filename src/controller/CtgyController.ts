import type { Context } from 'koa'
import { get } from '../decorator'

// refactor koa router module using ts decorators
class CtgyController {
  static ctgyController: CtgyController = new CtgyController()

  @get('/findSecThrdCtgys/:firstctgyid')
  async findSecThrdCtgy(ctx: Context) {

  }
}

export default CtgyController.ctgyController

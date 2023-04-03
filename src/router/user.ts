import type { Context } from 'koa'
import Router from 'koa-router'
import userDao from '../dao/UserDao'

const router = new Router()

router.prefix('/usermodule')

router.get('/finduserinfo/:username/:password', async (ctx: Context) => {
  const { username, password } = ctx.params
  const userInfo = await userDao.findUserInfo(username, password)

  ctx.body = ctx.success(`find user info by username: ${username}`)
})

// post request -> add user
router.post('/adduser', async (ctx: Context) => {
  const { username, age } = ctx.request.body
  ctx.body = `add user: ${username}, password: ${age}`
})

export default router

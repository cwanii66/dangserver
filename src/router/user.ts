import type { Context } from 'koa'
import Router from 'koa-router'

// type of userinfo
interface UserInfo {
  username?: string
  password?: string
  age?: number
}

const router = new Router()

router.prefix('/usermodule')

router.get('/finduserinfo/:username', async (ctx: Context) => {
  const { username } = ctx.params
  ctx.body = `find user info by username: ${username}`
})

// post request -> add user
router.post('/adduser', async (ctx: Context) => {
  const { username, age }: UserInfo = ctx.request.body
  ctx.body = `add user: ${username}, password: ${age}`
})

export default router

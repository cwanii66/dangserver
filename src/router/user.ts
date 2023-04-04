import type { Context } from 'koa'
import Router from 'koa-router'
import userDao from '../dao/UserDao'
import { addUser } from '../dao/UserDaoDefine'

const router = new Router()

router.prefix('/usermodule')

router.get('/finduserinfo/:username/:password', async (ctx: Context) => {
  const { username, password } = ctx.params
  const userInfo = await userDao.findUserInfo(username, password)

  ctx.body = ctx.success(`find user info by username: ${username}`)
})

// post request -> add user
router.post('/adduser', async (ctx: Context) => {
  const addedUserinfo = ctx.request.body
  const data = await addUser(addedUserinfo)

  ctx.body = ctx.success(data.get({ plain: true }))
})

export default router

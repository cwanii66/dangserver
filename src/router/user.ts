import type { Context } from 'koa'
import Router from 'koa-router'
import UserDao from '../modules/userinfo/dao/UserDao'

const router = new Router()

router.prefix('/usermodule')

router.get('/finduserinfo/:username/:password', async (ctx: Context) => {
  const { username, password } = ctx.params
  const users = await UserDao.findUserByUsrAndPsw(username, password)
  ctx.body = ctx.success(users)
})

// find by props
router.get('/finduserbyprops', async (ctx: Context) => {
  const users = await UserDao.findUserByProps()
  ctx.body = ctx.success(users)
})

// fuzzy query
router.get('/findbylike/:key', async (ctx: Context) => {
  const { key } = ctx.params
  const users = await UserDao.findByLike(key)
  ctx.body = ctx.success(users)
})

// count userinfo
router.get('/countuserinfo', async (ctx: Context) => {
  const count = await UserDao.countUserinfo()
  ctx.body = ctx.success(count)
})

// find by username and address
router.get('/findbyusmaddr', async (ctx: Context) => {
  const users = await UserDao.findByUsmAndAddr()
  ctx.body = ctx.success(users)
})

// find user with pagination
router.get('/finduserwithpager/:pageNo/:pageSize', async (ctx: Context) => {
  const { pageNo, pageSize } = ctx.params
  const os = (pageNo - 1) * pageSize // offset
  const ps = Number(pageSize as string) // pageSize
  const users = await UserDao.findUserWithPager(os, ps)
  ctx.body = ctx.success(users)
})

// post request -> add user
router.post('/adduser', async (ctx: Context) => {
  const addedUserinfo = ctx.request.body
  const data = await UserDao.addUser(addedUserinfo)

  ctx.body = ctx.success(data.get({ plain: true }))
})

export default router

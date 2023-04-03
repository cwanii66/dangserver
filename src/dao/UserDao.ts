import { stringIsNotEmpty } from '../common/utils'
import type { UserInfo } from '../model'
import baseDao from './BaseDao'

class UserDao {
  findUserInfo(username: string, password: string) {
    let sql = 'select * from userinfo where 1=1'
    if (stringIsNotEmpty(username))
      sql += ` and username = '${username}'`
    if (stringIsNotEmpty(password))
      sql += ` and password = '${password}'`
    return baseDao.query<UserInfo[]>(sql)
  }
}

export default new UserDao()

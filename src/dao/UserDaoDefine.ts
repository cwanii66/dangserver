import { userModel } from '../DaoModel'
import type { UserInfo } from '../model'

class UserDao {
  static addUser(userinfo: Partial<UserInfo>) {
    return userModel.create(userinfo)
  }
}

export const { addUser } = UserDao

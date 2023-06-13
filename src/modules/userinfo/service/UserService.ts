import jwt from 'jsonwebtoken'
import UserDao from '../dao/UserDao'

class UserService {
  static userService: UserService = new UserService()

  public async login(username: string, password: string) {
    const userInfo = await UserDao.findOneUser(username, password)
    if (userInfo) {
      const token = this.createJwt(userInfo!)
      userInfo!.token = token
    }
    return userInfo
  }

  private createJwt(data: any) {
    const user_token = jwt.sign({ data }, 'cwanii', { expiresIn: '24h', algorithm: 'HS256' })
    return user_token
  }
}

export default UserService.userService

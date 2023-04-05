import './BaseDaoOrm'
import { Op } from 'sequelize'
import UserinfoModel from '@/ormModel/Userinfo'

class UserDaoOrm {
  static userDaoOrm: UserDaoOrm = new UserDaoOrm()

  findAllUser() {
    return UserinfoModel.findAll()
  }

  findByLike(key: string) {
    return UserinfoModel.findAll({
      raw: true,
      where: {
        username: {
          [Op.like]: `%${key}%`,
        },
      },
    })
  }
}

export const userDaoOrm = UserDaoOrm.userDaoOrm

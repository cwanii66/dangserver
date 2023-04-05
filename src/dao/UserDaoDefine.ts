import { Op } from 'sequelize'
import { userModel } from '../DaoModel'
import type { UserInfo } from '../model'
import { sequelize } from './BaseDaoDefine'

class UserDao {
  static addUser(userinfo: Partial<UserInfo>) {
    return userModel.create(userinfo)
  }

  static findAllUser() {
    return userModel.findAll({ raw: true })
  }

  static findUserByProps() {
    return userModel.findAll({
      raw: true,
      attributes: ['username', 'password'],
    })
  }

  // find user by username and password
  static findUserByUsrAndPsw(username: string, password: string) {
    return userModel.findOne({
      raw: true,
      where: {
        [Op.and]: [
          { username },
          { password },
        ],
      },
    })
  }

  // fuzzy query
  static findByLike(key: string) {
    const searchKey = `%${key}%`
    return userModel.findAll({
      raw: true,
      where: {
        username: {
          [Op.like]: searchKey,
        },
      },
    })
  }

  static findByUsmAndAddr() {
    return userModel.findAll({
      raw: true,
      where: {
        [Op.or]: [
          {
            username: {
              [Op.like]: '%e%',
            },
          },
          {
            address: {
              [Op.like]: 'b%',
            },
          },
        ],
      },
    })
  }

  static countUserinfo() {
    return userModel.findAll({
      raw: true,
      attributes: ['address', [sequelize.fn('count', sequelize.col('valid')), 'total count']],
      where: {
        valid: 1,
      },
      group: ['address'],
    })
  }

  static findUserWithPager(offset: number, pageSize: number) {
    return userModel.findAll({
      raw: true,
      limit: pageSize,
      offset,
    })
  }
}

export const { addUser, countUserinfo, findUserWithPager, findAllUser, findUserByProps, findUserByUsrAndPsw, findByLike, findByUsmAndAddr } = UserDao

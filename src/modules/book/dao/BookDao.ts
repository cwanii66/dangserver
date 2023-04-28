import { Op } from 'sequelize'
import { booksModel } from '../defModel/BookModel'

class BookDao {
  static bookDao: BookDao = new BookDao()

  async findBooksByLike(key: string) {
    const searchKey = `%${key}%`
    return booksModel.findAll({
      raw: true,
      where: {
        bookname: {
          [Op.like]: searchKey,
        },
      },
    })
  }

  // find books by thirdctgyId
  async findBooksByThirdctgyId(thirdctgyId: number) {
    return booksModel.findAll({
      raw: true,
      where: {
        thirdctgyId,
      },
    })
  }

  async findBooksByPager(offset: number, pageSize: number) {
    return booksModel.findAll({
      raw: true,
      limit: pageSize,
      offset,
    })
  }
}

export default BookDao.bookDao

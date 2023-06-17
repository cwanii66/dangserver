import { Op } from 'sequelize'
import { booksModel } from '../defModel/BookModel'
import { getNoReptItm } from '../../commonModuleFn'

class BookDao {
  static bookDao: BookDao = new BookDao()

  async findAllBooksBySecondCtgyId(secondCtgyId: number) {
    return booksModel.findAll({
      raw: true,
      where: {
        secondctgyId: secondCtgyId,
      },
    })
  }

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
  async findBooksByThirdctgyId(thirdctgyId: number, sortField = 'originalprice', sortType = 'desc') {
    return booksModel.findAll({
      raw: true,
      order: [
        [sortField, sortType],
      ],
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

  async findBooksByAutoCompKeyword(autoCompKeyword: string) {
    return booksModel.findAll({
      raw: true,
      where: {
        bookname: {
          [Op.like]: `%${autoCompKeyword}%`,
        },
      },
    })
  }

  async findPublishersByAutoCompKeyword(autoCompKeyword: string) {
    const publisherInfos = await booksModel.findAll({
      raw: true,
      attributes: ['publishid', 'publishername'],
      where: {
        bookname: {
          [Op.like]: `%${autoCompKeyword}%`,
        },
      },
    }) as any[]
    const noReptPublisherInfos = getNoReptItm(publisherInfos, 'publishid')
    return noReptPublisherInfos
  }

  async findBooksByPublisherIds(publishIds: number[]) {
    return booksModel.findAll({
      raw: true,
      where: {
        publishid: {
          [Op.in]: publishIds,
        },
      },
    })
  }

  async findBooksByISBN(isbn: string) {
    return booksModel.findOne({
      raw: true,
      where: {
        isbn,
      },
    })
  }
}

export default BookDao.bookDao

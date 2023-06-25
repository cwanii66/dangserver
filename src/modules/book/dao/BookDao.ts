import { Op } from 'sequelize'
import { booksModel } from '../defModel/BookModel'
import { getNoReptItm } from '../../commonModuleFn'
import pager, { pagerEvaluator } from '../../../common/Pager'
import { sequelize } from '../../../modules/BaseDao'

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

  async findBooksByPager(currentPageNo: string) {
    const basePagerSql = 'select * from books'
    const countPageField = 'isbn'
    const totalRecordNumSql = 'select count(isbn) from books'
    await this.bookPager(currentPageNo, basePagerSql, totalRecordNumSql, countPageField)
    return pager.getCurrentPageData()
  }

  @pagerEvaluator(sequelize)
  /**
   * @params consistent with decorator functions, but not used here
   */
  private async bookPager(_currentPageNo: string, _basePagerSql: string, _totalRecordNumSql: string, _countPageField: string) {}

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

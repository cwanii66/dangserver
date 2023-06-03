import { Op } from 'sequelize'
import Keyword from '../../../modules/decoratorModel/KeyWord'
import HistoryKeyword from '../../../modules/decoratorModel/HistoryKeyWord'
import { sequelize } from '../../../modules/BaseDao'

class SearchDao {
  private static searchDao: SearchDao
  static getInstance() {
    if (!SearchDao.searchDao)
      SearchDao.searchDao = new SearchDao()

    return SearchDao.searchDao
  }

  private constructor() {}

  // search keywords list according to input key
  async searchKeywords(keyword: string) {
    return await Keyword.findAll({
      raw: true,
      where: {
        keyword: {
          [Op.like]: `%${keyword}%`,
        },
      },
    })
  }

  // search whether exist the history keywords
  async searchHistoryKeyword(historyKeyword: string) {
    return await HistoryKeyword.findOne({
      raw: true,
      where: {
        historykeyword: {
          [Op.like]: `%${historyKeyword}%`,
        },
      },
    })
  }

  // search history keywords list
  async searchHistoryKeywords() {
    return await HistoryKeyword.findAll({
      raw: true,
    })
  }

  // search history keywords list order by clickcount desc
  async searchHistoryKeywordsDesc() {
    return await HistoryKeyword.findAll({
      raw: true,
      order: [['clickcount', 'DESC']],
    })
  }

  // save the history keywords
  async saveHistoryKeywords(historyKeyword: string): Promise<[any, any]> {
    const sql = `insert into historykeyword (historykeyword, clickcount) values ('${historyKeyword}', 1)`
    return await sequelize.query(sql)
  }

  // update clickcount of history keywords
  async updateHistoryKeywordClickCount(historyKeyword: string): Promise<[any, any]> {
    const sql = `update historykeyword set clickcount = clickcount + 1 where historykeyword = '${historyKeyword}'`
    return await sequelize.query(sql)
  }
}

export default SearchDao.getInstance()

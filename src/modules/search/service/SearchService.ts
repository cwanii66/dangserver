import searchDao from '../dao/SearchDao'

class SearchService {
  static searchService: SearchService = new SearchService()

  async addOrUpdateHistoryKeyword(historyKeyword: string) {
    const historyKeywordObj = await searchDao.searchHistoryKeyword(historyKeyword)
    if (historyKeywordObj) {
      const [updateInfo] = await searchDao.updateHistoryKeywordClickCount(historyKeyword)
      return updateInfo.affectedRows
    }
    else {
      const ret: [number, number] = await searchDao.saveHistoryKeywords(historyKeyword)
      return ret[0] // means hkwid(primary key)
    }
  }

  async searchHistoryKeywords() {
    return await searchDao.searchHistoryKeywords()
  }

  async searchKeywords(keyword: string) {
    return await searchDao.searchKeywords(keyword)
  }

  async searchHistoryKeywordsDesc() {
    return await searchDao.searchHistoryKeywordsDesc()
  }

  async delSearchHistory() {
    return await searchDao.delHistoryKeywords()
  }
}

export default SearchService.searchService

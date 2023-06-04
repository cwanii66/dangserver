import type { Context } from 'koa'
import { controller, del, get, post, put } from '../decorator'
import searchService from '../modules/search/service/SearchService'

@controller('/searchmodule')
class SearchController {
  @get('/searchHistoryKeywords')
  async searchHistoryKeywords(ctx: Context) {
    const historyKeywords = await searchService.searchHistoryKeywords()
    ctx.body = ctx.success(historyKeywords)
  }

  @post('/addHistoryKeyword')
  async addHistoryKeyword(ctx: Context) {
    const { historyKeyword } = ctx.request.body
    const savedId = await searchService.addOrUpdateHistoryKeyword(historyKeyword)
    ctx.body = ctx.success(savedId)
  }

  @put('/updateHistoryKeyword')
  async updateHistoryKeyword(ctx: Context) {
    const { historyKeyword } = ctx.request.body
    const affectedRows = await searchService.addOrUpdateHistoryKeyword(historyKeyword)
    ctx.body = ctx.success(affectedRows)
  }

  @get('/searchKeywords/:keyword')
  async searchKeywords(ctx: Context) {
    const { keyword } = ctx.params
    const keywords = await searchService.searchKeywords(keyword)
    ctx.body = ctx.success(keywords)
  }

  @get('/searchHistoryKeywordsDesc')
  async searchHistoryKeywordsDesc(ctx: Context) {
    const historyKeywords = await searchService.searchHistoryKeywordsDesc()
    ctx.body = ctx.success(historyKeywords)
  }

  @del('/delHistoryKeywords')
  async delHistoryKeywords(ctx: Context) {
    const affectedRows = await searchService.delSearchHistory()
    ctx.body = ctx.success(affectedRows)
  }
}

export default new SearchController()

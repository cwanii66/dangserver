import type { Context } from 'koa'
import { controller, get, post, put } from '../decorator'
import searchService from '../modules/search/service/SearchService'

@controller('/searchmodule')
class SearchController {
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
}

export default new SearchController()

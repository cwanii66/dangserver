import type { Sequelize } from 'sequelize'

type PagerParams = [currentPageNo: string, basePagerSql: string, totalRecordNumSql: string, countPageField: string]

class Pager {
  static pager: Pager = new Pager()

  private firstRecordPerPage!: number
  private pageSize = 4
  private currentPageNo = 1
  private totalPageNum = 0
  private currentPageData: any[] = []

  getPagerSize() {
    return this.pageSize
  }

  getFirstRecordPerPage(currentPageNo: string, pageSize?: string) {
    this.currentPageNo = Number(currentPageNo) || 1
    this.pageSize = Number(pageSize) || 4
    this.firstRecordPerPage = (this.currentPageNo - 1) * this.pageSize
    return this.firstRecordPerPage
  }

  getTotalPageNum(totalRecordNum: number) {
    this.totalPageNum = Math.ceil(totalRecordNum / this.pageSize)
    return this.totalPageNum
  }

  saveCurrentPageData(currentPageDataList: any[]) {
    this.currentPageData = currentPageDataList
  }

  getCurrentPageData() {
    return {
      currentPageNo: this.currentPageNo,
      currentPageDataList: this.currentPageData,
      totalPageNum: this.totalPageNum,
    }
  }
}
const pager = Pager.pager

export function pagerEvaluator(sequelize: Sequelize) {
  return function pagerDecorator(_targetPrototype: Object, _propertyKey: string, descriptor: PropertyDescriptor) {
    // const originalMethod = descriptor.value
    descriptor.value = async function (...args: PagerParams) {
      const [currentPageNo, basePagerSql, totalRecordNumSql, countPageField] = args
      const firstRecordPerPage = pager.getFirstRecordPerPage(currentPageNo)

      const pagerSql = `${basePagerSql} limit ${pager.getPagerSize()} offset ${firstRecordPerPage}`
      const currentPageDataList = (await sequelize.query(pagerSql))[0]
      pager.saveCurrentPageData(currentPageDataList)

      const totalRecordNumObj = (await sequelize.query(totalRecordNumSql))[0][0] as any
      pager.getTotalPageNum(totalRecordNumObj[`count(${countPageField})`])
    }
    return descriptor
  }
}
export default pager

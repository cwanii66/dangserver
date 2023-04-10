import { getSubItemList } from './Ctgy'
import { getNoReptItm } from './Ctgy2'

type UnionIntersection<U> =
  (U extends any ? (arg: U) => any : never) extends
  ((arg: infer I) => void) ? I : never

type SecThrdCtgyList = {
  secondctgyId: number
  secondgyname: string
  firstctgyId: number
  thirdctgyId: number
  thirdname: string
  secctgyid: number
}[]

export function combine<T extends object[]>(...args: T): UnionIntersection<T[number]>
export function combine<T extends object[]>(...o: T) {
  return o.reduce((preVal, curVal) => ({ ...preVal, ...curVal }), {})
}

export function convert(secThrdCtgys: SecThrdCtgyList) {
  const secCtgyList = getSubItemList(secThrdCtgys, ['secondctgyId', 'secondgyname', 'firstctgyId'])
  const noReptSecCtgyList = getNoReptItm(secCtgyList, 'secondctgyId')
  const thrdCtgyList = getSubItemList(secThrdCtgys, ['thirdctgyId', 'thirdname', 'secctgyid'])

  const finalCtgyList = noReptSecCtgyList.map((item) => {
    const finalThrdList = []
    for (const thrdCtgy of thrdCtgyList) {
      if (thrdCtgy.secctgyid === item.secondctgyId)
        finalThrdList.push(thrdCtgy)
    }
    return combine(item, { thirdctgys: finalThrdList })
  })
  return finalCtgyList
}

import { combine, getNoReptItm, getSubItemList } from '../commonModuleFn'
import type { SecThrdCtgyList } from './CtgyTypes'

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

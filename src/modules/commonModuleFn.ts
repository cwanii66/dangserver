import type { UnionIntersection } from '../types'
import type { EleOfArrPick, ElementOfArray } from './ctgy/CtgyTypes'

export function getSubItemList<
  T extends EleOfArrPick<T>[],
  K extends keyof ElementOfArray<T>,
>(originalList: T, expectedKeys: K[]): Pick<ElementOfArray<T>, K>[] {
  return originalList.map((item) => {
    const obj = expectedKeys.reduce((preVal, curVal) => {
      return {
        ...preVal,
        [curVal]: item[curVal],
      }
    }, {})
    return obj
  }) as Pick<ElementOfArray<T>, K>[]
}

// get composed array consists of single property
function getOneItemValuesFrmArr<
  T extends EleOfArrPick<T>[],
  K extends keyof ElementOfArray<T>,
  E = ElementOfArray<T>,
>(arr: T, k: K) {
  return arr.map(({ [k]: v }: E) => v)
}

// dedupe array
function getNoReptValItm(arr: unknown[]) {
  const uiqArr: unknown[] = []
  return arr.filter(item =>
    !uiqArr.includes(item) && uiqArr.push(item),
  )
}

// dedupe object
export function getNoReptItm<
  T extends EleOfArrPick<T>[],
  K extends keyof ElementOfArray<T>,
>(arr: T, k: K): EleOfArrPick<T>[] {
  const ret: EleOfArrPick<T>[] = []
  const oneItemValues = getOneItemValuesFrmArr(arr, k)
  const noReptItemValues = getNoReptValItm(oneItemValues)

  arr.filter((item) => {
    if (noReptItemValues.includes(item[k])) {
      noReptItemValues.splice(noReptItemValues.indexOf(item[k]), 1)
      return ret.push(item)
    }
    return false
  })
  return ret
}

export function combine<T extends object[]>(...args: T): UnionIntersection<T[number]>
export function combine<T extends object[]>(...o: T) {
  return o.reduce((preVal, curVal) => ({ ...preVal, ...curVal }), {})
}

import type { EleOfArrPick, ElementOfArray } from './Ctgy'

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

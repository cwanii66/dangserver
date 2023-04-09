import { secThrdCtgys, EleOfArrPick, ElementOfArray } from "./Ctgy";
import { getNoReptItm } from './Ctgy2'

type UnionIntersection<U> =
  (U extends any ? (arg: U) => any : never) extends
  ((arg: infer I) => void) ? I : never

export function combine<T extends object[]>(...args: T): UnionIntersection<T[number]>
export function combine<T extends object[]>(...o: T) {
  return o.reduce((preVal, curVal) => ({ ...preVal, ...curVal }), {})
}

combine({ username: 'chris', age: '12' }, { phone: '111' })

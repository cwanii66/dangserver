export type UnionIntersection<U> =
  (U extends any ? (arg: U) => any : never) extends
  ((arg: infer I) => void) ? I : never

export type ElementOfArray<T> = T extends (infer U)[] ? U : never

export type EleOfArrPick<T extends Record<string, unknown>[]> = {
  [P in keyof ElementOfArray<T>]: ElementOfArray<T>[P]
}

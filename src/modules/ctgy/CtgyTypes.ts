export type ElementOfArray<T> = T extends (infer U)[] ? U : never

export type EleOfArrPick<T extends Record<string, unknown>[]> = {
  [P in keyof ElementOfArray<T>]: ElementOfArray<T>[P]
}

export type SecThrdCtgyList = {
  secondctgyId: number
  secondgyname: string
  firstctgyId: number
  thirdctgyId: number
  thirdname: string
  secctgyid: number
}[]

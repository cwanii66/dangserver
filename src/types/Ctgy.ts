export const secThrdCtgys = [
  {
    secondctgyId: 1,
    secondgyname: '0-2岁',
    firstctgyId: 1,
    thirdctgyId: 1,
    thirdname: '图画故事',
  },
  {
    secondctgyId: 1,
    secondgyname: '0-2岁',
    firstctgyId: 1,
    thirdctgyId: 2,
    thirdname: '认知',
  },
  {
    secondctgyId: 1,
    secondgyname: '0-2岁',
    firstctgyId: 1,
    thirdctgyId: 3,
    thirdname: '益智游戏',
  },
  {
    secondctgyId: 1,
    secondgyname: '0-2岁',
    firstctgyId: 1,
    thirdctgyId: 4,
    thirdname: '纸板书',
  },
  {
    secondctgyId: 1,
    secondgyname: '0-2岁',
    firstctgyId: 1,
    thirdctgyId: 5,
    thirdname: '艺术课堂',
  },
  {
    secondctgyId: 1,
    secondgyname: '0-2岁',
    firstctgyId: 1,
    thirdctgyId: 6,
    thirdname: '入园准备',
  },
  {
    secondctgyId: 2,
    secondgyname: '3-6岁',
    firstctgyId: 1,
    thirdctgyId: 7,
    thirdname: '绘本',
  },
  {
    secondctgyId: 2,
    secondgyname: '3-6岁',
    firstctgyId: 1,
    thirdctgyId: 8,
    thirdname: '科普百科',
  },
  {
    secondctgyId: 2,
    secondgyname: '3-6岁',
    firstctgyId: 1,
    thirdctgyId: 9,
    thirdname: '少儿英语',
  },
  {
    secondctgyId: 2,
    secondgyname: '3-6岁',
    firstctgyId: 1,
    thirdctgyId: 10,
    thirdname: '乐高学习',
  },
  {
    secondctgyId: 2,
    secondgyname: '3-6岁',
    firstctgyId: 1,
    thirdctgyId: 11,
    thirdname: '入学准备',
  },
  {
    secondctgyId: 3,
    secondgyname: '7-10岁',
    firstctgyId: 1,
    thirdctgyId: 12,
    thirdname: '文学',
  },
  {
    secondctgyId: 3,
    secondgyname: '7-10岁',
    firstctgyId: 1,
    thirdctgyId: 13,
    thirdname: '科普百科',
  },
  {
    secondctgyId: 3,
    secondgyname: '7-10岁',
    firstctgyId: 1,
    thirdctgyId: 14,
    thirdname: '卡通动漫',
  },
  {
    secondctgyId: 3,
    secondgyname: '7-10岁',
    firstctgyId: 1,
    thirdctgyId: 15,
    thirdname: '童话',
  },
  {
    secondctgyId: 3,
    secondgyname: '7-10岁',
    firstctgyId: 1,
    thirdctgyId: 16,
    thirdname: '少儿英语',
  },
  {
    secondctgyId: 4,
    secondgyname: '11-14岁',
    firstctgyId: 1,
    thirdctgyId: 17,
    thirdname: '励志',
  },
  {
    secondctgyId: 4,
    secondgyname: '11-14岁',
    firstctgyId: 1,
    thirdctgyId: 18,
    thirdname: '地理',
  },
  {
    secondctgyId: 4,
    secondgyname: '11-14岁',
    firstctgyId: 1,
    thirdctgyId: 19,
    thirdname: '政治',
  },
  {
    secondctgyId: 4,
    secondgyname: '11-14岁',
    firstctgyId: 1,
    thirdctgyId: 20,
    thirdname: '趣味幽默',
  },
  {
    secondctgyId: 4,
    secondgyname: '11-14岁',
    firstctgyId: 1,
    thirdctgyId: 21,
    thirdname: '少儿英语',
  },
  {
    secondctgyId: 4,
    secondgyname: '11-14岁',
    firstctgyId: 1,
    thirdctgyId: 22,
    thirdname: '益智游戏',
  },
  {
    secondctgyId: 4,
    secondgyname: '11-14岁',
    firstctgyId: 1,
    thirdctgyId: 23,
    thirdname: '艺术课堂',
  },
  {
    secondctgyId: 4,
    secondgyname: '11-14岁',
    firstctgyId: 1,
    thirdctgyId: 24,
    thirdname: '游戏/手工',
  },
  {
    secondctgyId: 4,
    secondgyname: '11-14岁',
    firstctgyId: 1,
    thirdctgyId: 25,
    thirdname: '绘画',
  },
]

export type ElementOfArray<T> = T extends (infer U)[] ? U : never
export type EleOfArrPick<T extends Record<string, unknown>[]> = {
  [P in keyof ElementOfArray<T>]: ElementOfArray<T>[P]
}

// visualize types of secThrdCtgys
export type STC = ElementOfArray<typeof secThrdCtgys>
export type Keys = keyof ElementOfArray<typeof secThrdCtgys>

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

// import necessary modules from vitest
import { describe, expect, it } from 'vitest'
import { findSecondCtgyByFirstCtgyId } from '../src/modules/ctgy/defModel/OneToMany'
import { getSubItemList, secThrdCtgys } from '../src/types/Ctgy'
import { getNoReptItm } from '../src/types/Ctgy2'
import { convert } from '../src/types/Ctgy3'

// test case for findSecondCtgyByFirstCtgyId
describe('findSecondCtgyByFirstCtgyId', () => {
  it('should return secondCtgy', async () => {
    const ret = (await findSecondCtgyByFirstCtgyId(1)).slice(0, 3)
    expect(ret).toMatchInlineSnapshot(`
      [
        {
          "firstctgyId": 1,
          "secondctgyId": 1,
          "secondgyname": "0-2岁",
          "thirdctgys": [
            {
              "secondctgyId": 1,
              "thirdctgyId": 1,
              "thirdname": "图画故事",
            },
            {
              "secondctgyId": 1,
              "thirdctgyId": 2,
              "thirdname": "认知",
            },
            {
              "secondctgyId": 1,
              "thirdctgyId": 3,
              "thirdname": "益智游戏",
            },
            {
              "secondctgyId": 1,
              "thirdctgyId": 4,
              "thirdname": "纸板书",
            },
            {
              "secondctgyId": 1,
              "thirdctgyId": 5,
              "thirdname": "艺术课堂",
            },
            {
              "secondctgyId": 1,
              "thirdctgyId": 6,
              "thirdname": "入园准备",
            },
          ],
        },
        {
          "firstctgyId": 1,
          "secondctgyId": 2,
          "secondgyname": "3-6岁",
          "thirdctgys": [
            {
              "secondctgyId": 2,
              "thirdctgyId": 7,
              "thirdname": "绘本",
            },
            {
              "secondctgyId": 2,
              "thirdctgyId": 8,
              "thirdname": "科普百科",
            },
            {
              "secondctgyId": 2,
              "thirdctgyId": 9,
              "thirdname": "少儿英语",
            },
            {
              "secondctgyId": 2,
              "thirdctgyId": 10,
              "thirdname": "乐高学习",
            },
            {
              "secondctgyId": 2,
              "thirdctgyId": 11,
              "thirdname": "入学准备",
            },
          ],
        },
        {
          "firstctgyId": 1,
          "secondctgyId": 3,
          "secondgyname": "7-10岁",
          "thirdctgys": [
            {
              "secondctgyId": 3,
              "thirdctgyId": 12,
              "thirdname": "文学",
            },
            {
              "secondctgyId": 3,
              "thirdctgyId": 13,
              "thirdname": "科普百科",
            },
            {
              "secondctgyId": 3,
              "thirdctgyId": 14,
              "thirdname": "卡通动漫",
            },
            {
              "secondctgyId": 3,
              "thirdctgyId": 15,
              "thirdname": "童话",
            },
            {
              "secondctgyId": 3,
              "thirdctgyId": 16,
              "thirdname": "少儿英语",
            },
          ],
        },
      ]
    `)
  })
})

// getSubItemList
describe('getSubItemList', () => {
  it('should return subList', async () => {
    expect(getSubItemList(secThrdCtgys, ['secondctgyId', 'secondgyname']))
      .toMatchInlineSnapshot(`
        [
          {
            "secondctgyId": 1,
            "secondgyname": "0-2岁",
          },
          {
            "secondctgyId": 1,
            "secondgyname": "0-2岁",
          },
          {
            "secondctgyId": 1,
            "secondgyname": "0-2岁",
          },
          {
            "secondctgyId": 1,
            "secondgyname": "0-2岁",
          },
          {
            "secondctgyId": 2,
            "secondgyname": "3-6岁",
          },
          {
            "secondctgyId": 2,
            "secondgyname": "3-6岁",
          },
          {
            "secondctgyId": 2,
            "secondgyname": "3-6岁",
          },
          {
            "secondctgyId": 2,
            "secondgyname": "3-6岁",
          },
          {
            "secondctgyId": 2,
            "secondgyname": "3-6岁",
          },
          {
            "secondctgyId": 3,
            "secondgyname": "7-10岁",
          },
          {
            "secondctgyId": 3,
            "secondgyname": "7-10岁",
          },
          {
            "secondctgyId": 3,
            "secondgyname": "7-10岁",
          },
          {
            "secondctgyId": 3,
            "secondgyname": "7-10岁",
          },
          {
            "secondctgyId": 3,
            "secondgyname": "7-10岁",
          },
          {
            "secondctgyId": 4,
            "secondgyname": "11-14岁",
          },
          {
            "secondctgyId": 4,
            "secondgyname": "11-14岁",
          },
          {
            "secondctgyId": 4,
            "secondgyname": "11-14岁",
          },
          {
            "secondctgyId": 4,
            "secondgyname": "11-14岁",
          },
          {
            "secondctgyId": 4,
            "secondgyname": "11-14岁",
          },
          {
            "secondctgyId": 4,
            "secondgyname": "11-14岁",
          },
          {
            "secondctgyId": 4,
            "secondgyname": "11-14岁",
          },
          {
            "secondctgyId": 4,
            "secondgyname": "11-14岁",
          },
          {
            "secondctgyId": 4,
            "secondgyname": "11-14岁",
          },
        ]
      `)
  })
})

// get restructured list
describe('getOneItemValuesFrmArr', () => {
  it('return regrouped list', async () => {
    expect(getNoReptItm(secThrdCtgys, 'secondctgyId'))
      .toMatchInlineSnapshot(`
        [
          {
            "firstctgyId": 1,
            "secctgyid": 1,
            "secondctgyId": 1,
            "secondgyname": "0-2岁",
            "thirdctgyId": 3,
            "thirdname": "益智游戏",
          },
          {
            "firstctgyId": 1,
            "secctgyid": 2,
            "secondctgyId": 2,
            "secondgyname": "3-6岁",
            "thirdctgyId": 7,
            "thirdname": "绘本",
          },
          {
            "firstctgyId": 1,
            "secctgyid": 3,
            "secondctgyId": 3,
            "secondgyname": "7-10岁",
            "thirdctgyId": 12,
            "thirdname": "文学",
          },
          {
            "firstctgyId": 1,
            "secctgyid": 4,
            "secondctgyId": 4,
            "secondgyname": "11-14岁",
            "thirdctgyId": 17,
            "thirdname": "励志",
          },
        ]
      `)
  })
})

// ctgy3
describe('convert', () => {
  it('convert itemList to expected form', async () => {
    expect(convert())
      .toMatchInlineSnapshot(`
        [
          {
            "firstctgyId": 1,
            "secondctgyId": 1,
            "secondgyname": "0-2岁",
            "thirdctgys": [
              {
                "secctgyid": 1,
                "thirdctgyId": 3,
                "thirdname": "益智游戏",
              },
              {
                "secctgyid": 1,
                "thirdctgyId": 4,
                "thirdname": "纸板书",
              },
              {
                "secctgyid": 1,
                "thirdctgyId": 5,
                "thirdname": "艺术课堂",
              },
              {
                "secctgyid": 1,
                "thirdctgyId": 6,
                "thirdname": "入园准备",
              },
            ],
          },
          {
            "firstctgyId": 1,
            "secondctgyId": 2,
            "secondgyname": "3-6岁",
            "thirdctgys": [
              {
                "secctgyid": 2,
                "thirdctgyId": 7,
                "thirdname": "绘本",
              },
              {
                "secctgyid": 2,
                "thirdctgyId": 8,
                "thirdname": "科普百科",
              },
              {
                "secctgyid": 2,
                "thirdctgyId": 9,
                "thirdname": "少儿英语",
              },
              {
                "secctgyid": 2,
                "thirdctgyId": 10,
                "thirdname": "乐高学习",
              },
              {
                "secctgyid": 2,
                "thirdctgyId": 11,
                "thirdname": "入学准备",
              },
            ],
          },
          {
            "firstctgyId": 1,
            "secondctgyId": 3,
            "secondgyname": "7-10岁",
            "thirdctgys": [
              {
                "secctgyid": 3,
                "thirdctgyId": 12,
                "thirdname": "文学",
              },
              {
                "secctgyid": 3,
                "thirdctgyId": 13,
                "thirdname": "科普百科",
              },
              {
                "secctgyid": 3,
                "thirdctgyId": 14,
                "thirdname": "卡通动漫",
              },
              {
                "secctgyid": 3,
                "thirdctgyId": 15,
                "thirdname": "童话",
              },
              {
                "secctgyid": 3,
                "thirdctgyId": 16,
                "thirdname": "少儿英语",
              },
            ],
          },
          {
            "firstctgyId": 1,
            "secondctgyId": 4,
            "secondgyname": "11-14岁",
            "thirdctgys": [
              {
                "secctgyid": 4,
                "thirdctgyId": 17,
                "thirdname": "励志",
              },
              {
                "secctgyid": 4,
                "thirdctgyId": 18,
                "thirdname": "地理",
              },
              {
                "secctgyid": 4,
                "thirdctgyId": 19,
                "thirdname": "政治",
              },
              {
                "secctgyid": 4,
                "thirdctgyId": 20,
                "thirdname": "趣味幽默",
              },
              {
                "secctgyid": 4,
                "thirdctgyId": 21,
                "thirdname": "少儿英语",
              },
              {
                "secctgyid": 4,
                "thirdctgyId": 22,
                "thirdname": "益智游戏",
              },
              {
                "secctgyid": 4,
                "thirdctgyId": 23,
                "thirdname": "艺术课堂",
              },
              {
                "secctgyid": 4,
                "thirdctgyId": 24,
                "thirdname": "游戏/手工",
              },
              {
                "secctgyid": 4,
                "thirdctgyId": 25,
                "thirdname": "绘画",
              },
            ],
          },
        ]
      `)
  })
})

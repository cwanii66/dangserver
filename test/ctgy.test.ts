// import necessary modules from vitest
import { describe, expect, it } from 'vitest'
import { findSecondCtgyByFirstCtgyId } from '../src/modules/ctgy/defModel/OneToMany'

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
          "thirdctgy.secondctgyId": 1,
          "thirdctgy.thirdctgyId": 1,
          "thirdctgy.thirdname": "图画故事",
        },
        {
          "firstctgyId": 1,
          "secondctgyId": 1,
          "secondgyname": "0-2岁",
          "thirdctgy.secondctgyId": 1,
          "thirdctgy.thirdctgyId": 2,
          "thirdctgy.thirdname": "认知",
        },
        {
          "firstctgyId": 1,
          "secondctgyId": 1,
          "secondgyname": "0-2岁",
          "thirdctgy.secondctgyId": 1,
          "thirdctgy.thirdctgyId": 3,
          "thirdctgy.thirdname": "益智游戏",
        },
      ]
    `)
  })
})

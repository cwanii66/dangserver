import { describe, expect, it } from 'vitest'
import allCtrlRouterLoader from '../src/common/AllCtrlRouterLoader'

describe('common', () => {
  it('AllCtrlRouterLoader', () => {
    expect(allCtrlRouterLoader.getAbsoluteFilePaths())
      .toMatchInlineSnapshot(`
        [
          "/Users/chriswong/p/dangserver/src/controller/CtgyController.ts",
          "/Users/chriswong/p/dangserver/src/controller/aController.ts",
        ]
      `)
  })
})

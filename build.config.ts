import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    'src/app.ts',
  ],
  declaration: true,
  clean: true,
  rollup: {
    emitCJS: true,
  },
})

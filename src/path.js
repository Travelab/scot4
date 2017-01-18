import path from 'path'

export const pkgBase = __dirname
export const cliBase = process.cwd()

export const packagesPath							= path.join(cliBase, 'packages')
export const buildPath								= path.join(cliBase, 'build')

export const storybookPath							= path.join(pkgBase, 'storybook')
export const selectComponentsLoaderPath		= path.join(storybookPath, 'select-components-loader.js')

export default path